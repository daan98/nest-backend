import { IsString } from "class-validator";

export class CreateHeroDto {
    @IsString()
    id               : string;

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

    @IsString()
    alter_img        : string;
}
