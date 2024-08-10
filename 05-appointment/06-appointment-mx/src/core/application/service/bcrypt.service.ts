import { hash, compare } from 'bcryptjs'
 
export class BcryptService {

    async hashPass(password: string) {
        const salt = 10;
        const hashed = await hash(password, salt);
        return hashed;
    }

    async compareHash(pass: string, hash: string) {

        return await compare(pass, hash)
    }
}