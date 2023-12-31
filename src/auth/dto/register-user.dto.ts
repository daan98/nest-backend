import { IsEmail, IsString, MinLength, Equals } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    email           : string;

    @IsString()
    name            : string;

    @MinLength(8)
    password        : string;

    @MinLength(8)
    confirmPassword : string;

}