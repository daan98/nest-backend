import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroDto } from './create-hero.dto';
import { IsString } from 'class-validator';

export class UpdateHeroDto extends PartialType(CreateHeroDto) {

    @IsString()
    superhero        : string;

    @IsString()
    publisher        : string;
    
    @IsString()
    alter_ego        : string;

    @IsString()
    first_appearance : string;

    @IsString()
    characters       : string;
}
