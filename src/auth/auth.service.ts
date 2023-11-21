import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from "bcryptjs";

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel : Model<User>
  ) { }

  /* async */ create(createUserDto: CreateUserDto) : Promise<User> {
    console.log('createUserDto: ', createUserDto);
    const newUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password
    });
    console.log('newUser: ', newUser);
    return newUser.save();
    /* try {
      // 1. Encryting password
      const { password, ...userData } = createUserDto;
      
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });

      // 2. Save user
      await newUser.save();

      // 3. Generate JWT

      const { password:_, ...user } = newUser.toJSON();
      console.log('user :', user);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${ createUserDto.email } already exists.`);
      }

      throw new InternalServerErrorException('Something went wrong. Please contact the backend team.');
    } */

  }

  findAll() {
    return `This action returns all auth`;
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
}
