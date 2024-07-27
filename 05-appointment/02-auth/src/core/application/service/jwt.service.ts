import { sign } from 'jsonwebtoken';
import { Parameter } from 'src/core/parameter';

export interface TokenPayload {
    name: string;
    lastname: string;
    email: string;
    roles: number[];

}

export class JwtService {

    generateAccessToken(payload: TokenPayload) {
        return sign(payload,Parameter.server_config.jwtSecretKey,{
            expiresIn: "24h"
        })
    }
}