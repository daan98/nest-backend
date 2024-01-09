import { Inject, Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Hero, HeroSchema } from './entities/hero.entity';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{name: Hero.name , schema: HeroSchema }])
  ]
})
export class HeroesModule {}
