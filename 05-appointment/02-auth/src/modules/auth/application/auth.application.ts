import { IError } from "src/core/utils/ierror.interface";
import { Auth } from "../domain/auth";
import { AuthRepository, AuthTokens } from '../domain/repositories/auth.repository';
import { err, Result,ok } from "neverthrow";
import { BcryptService } from "./../../../core/application/service/bcrypt.service";
import { JwtService } from "./../../../core/application/service/jwt.service";

export type AuthLogin = Result<AuthTokens,IError>;

export class AuthApplication {

  constructor(
    private readonly authRepository: AuthRepository, 
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService) {

  }

  async login(auth: Auth) : Promise<AuthLogin>{
    console.log({
      authapp: auth
    })
    const userResult = await this.authRepository.getUserByEmail(auth.properties.email);
    console.log({userResult})
    if (userResult.isErr()) {
      const error: IError = new Error(userResult.error.message);
      error.status = 404;
      return err(error);
    }
    // comparar contraseña
    const { password: hashed, ...rest } = userResult.value;

    const matched = await this.bcryptService.compareHash(auth.properties.password, hashed);

    if(!matched) {
      const error: IError = new Error("Invalid credentials");
      error.status = 401;
      return err(error);
    } 
    const response: AuthTokens = {
      access_token: this.jwtService.generateAccessToken(rest),
      refreshToken: rest.refreshToken
    }

    return ok(response);
  }
}