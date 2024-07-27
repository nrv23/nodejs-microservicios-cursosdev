import { HttpClientService } from "src/core/application/service/http-client.service";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { Parameter } from "src/core/parameter";
import { AxiosError } from "axios";
import { AuthDto, AuthUser } from "./dtos/user.dto";
import { Result, err, ok } from "neverthrow";

export type AuthFindByEmail = Result<AuthUser, Error>;

export class AuthInfrastructure implements AuthRepository {
  constructor(private readonly httpClientService: HttpClientService) {

  }

  async getUserByEmail(email: string): Promise<AuthFindByEmail> {
    try {
      const response = await this.httpClientService.request(Parameter.server_config.apiGetUser, "post", { email });
      return ok(AuthDto.fromDataToDomail(response));
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.log(error);
    const errobj = new Error();
    errobj.message = (error as Error).message;
    // funcion err donde devuelve el error sin crear una excepcion
    return err(errobj);
  }

}