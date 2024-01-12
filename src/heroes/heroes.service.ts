import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './entities/hero.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class HeroesService {

  constructor(
    @InjectModel(Hero.name)
    private heroModel : Model<Hero>
  ) {}

  async create(createHeroDto: CreateHeroDto) {
    
    try {
      const superheroRegex = new RegExp(`${createHeroDto.superhero}`, 'i');
      const foundHero = await this.heroModel.find({ superhero: {$regex: superheroRegex} }).exec();
  
      if(foundHero.length > 0) {
        throw new BadRequestException(`${ createHeroDto.superhero } has already been created`);
      }

      const newHero = new this.heroModel(createHeroDto)

      await newHero.save();

      return newHero;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${ createHeroDto.superhero } has already been created`);
      }

      throw new InternalServerErrorException(`Something went wrong while creating hero. Please contact the backend if problem persists ${error}`);
    }
  }

  async findAll() {
    try {
      const foundHeroes = await this.heroModel.find();

      if (foundHeroes.length > 0) {
        return foundHeroes;
      }

      throw new Error('There are no heroes, please add somes.');
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async findOne(id : string) {
    
    try {
      const foundHero = await this.heroModel.findById(id);

      if(foundHero) {
        return foundHero;
      }

      throw new Error('No hero was found');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findSearch(query : string, limit : string) {
    try {
      const queryRegex = new RegExp(`${query}`, 'i');
      const foundHeroes = await this.heroModel.find({superhero: { $regex: queryRegex } }, undefined, {
        limit: +limit
      });
      
      if(foundHeroes.length > 0) {
        return foundHeroes
      }

      throw new Error('There are no heroes that match the search.');
    } catch (error) {
      throw new InternalServerErrorException(`Something went wrong while searching hero. Please contact the backend if problem persists`);
    }
  }

  async update(id: any, updateHeroDto: UpdateHeroDto) {
    try {
      if(updateHeroDto.superhero) {
        const superheroRegex = new RegExp(`${updateHeroDto.superhero}`, 'i');
        const foundHero      = await this.heroModel.find({ superhero: {$regex: superheroRegex} }).exec();
    
        if(foundHero.length > 0) {
          throw new BadRequestException(`${ updateHeroDto.superhero } has already been created`);
        }
      }

      const updatedHero = await this.heroModel.findByIdAndUpdate(id, updateHeroDto, {
        new: true,
      });

      return updatedHero;
    } catch (error) {
      throw new InternalServerErrorException(`Something went wrong while updating hero. Please contact the backend if problem persists`);
    }
  }

  async remove(id: string) {
    try {
      await this.heroModel.findByIdAndDelete(id);

      const message = `hero with id: ${id} was successfully deleted.`;
      return message;
    } catch (error) {
      throw new InternalServerErrorException(`Something went wrong while deleting hero. Please contact the backend if problem persists`);
    }
  }
}
