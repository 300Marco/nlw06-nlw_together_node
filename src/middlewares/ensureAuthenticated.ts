import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // Receber o token
    const authToken = request.headers.authorization;
    
    // Validar se toke esta preenchido
    if(!authToken) {
        return response.status(401).end();
    };

    const [, token] = authToken.split(" ");
    
    // Validar se token é válido
    try {
        const { sub } = verify(token, "fdc1b6467021b8939a2e12118c9bfd2b") as IPayload;

        // Recuperar informações do usuário
        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();    
    };
};