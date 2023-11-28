import { User } from "../entities/user.entity";

export default interface LoginResponseInterface {
    user  : User;
    token : string;
};