import { IsString } from "class-validator";


export class DeleteHeroDto {
    @IsString()
    id               : string;
}