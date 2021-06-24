import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
};

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        };

        // Verificar se senha está correta
        
        //123456 = 21347672-sadhubndhf3542567364
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        // Gerar token
        const token = sign( {
            email: user.email
        }, "fdc1b6467021b8939a2e12118c9bfd2b", {
            subject : user.id, 
            expiresIn: "1d"
        } );
        return token;
    };
};

export { AuthenticateUserService };