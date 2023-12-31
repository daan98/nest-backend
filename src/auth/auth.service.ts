import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcryptjs from "bcryptjs";

import { CreateUserDto, LoginDto, RegisterUserDto, UpdateAuthDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload, LoginResponseInterface } from './interfaces';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel : Model<User>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) : Promise<User> {
    try {
      // 1. Encryting password
      const { password, ...userData } = createUserDto;
      
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });

      // 2. Save user
      await newUser.save();

      const { password:_, ...user } = newUser.toJSON();

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${ createUserDto.email } already exists.`);
      }

      throw new InternalServerErrorException('Something went wrong. Please contact the backend team.');
    }

  }

  async register(registerUserDto : RegisterUserDto) : Promise<LoginResponseInterface> {
    /* Handling possible scenario in which the RegisterUserDto and CreateUserDto are differents */
    const { email, name, password, confirmPassword } = registerUserDto;

    if(password !== confirmPassword) {
      throw new UnauthorizedException('password must match.')
    }
    
    const user = await this.create({ email, name, password })
    return {
      user,
      token: this.getJWT({ id: user?._id }),
    };
  }

  async login( loginDto : LoginDto ) : Promise<LoginResponseInterface> {
    const { password, email } = loginDto;
    const user = await this.userModel.findOne({ email });

    if(!user) {
      throw new UnauthorizedException('Unvalid user')
    }

    if(!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Unvalid password');
    }

    const { password:_, ...loggedUser } = user.toJSON();
    return {
      user: loggedUser,
      token: this.getJWT({ id: user.id })
    }
  }

  findAll() : Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById( id : string ) {
    const user = await this.userModel.findById( id );
    const { password, ...rest } = user.toJSON();
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJWT( payload : JwtPayload ) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
