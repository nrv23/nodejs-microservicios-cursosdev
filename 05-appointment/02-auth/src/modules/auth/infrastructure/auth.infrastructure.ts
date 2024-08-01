import { HttpClientService } from "src/core/application/service/http-client.service";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { Parameter } from "./../../../core/parameter";
import { AxiosError } from "axios";
import { AuthDto, AuthUser } from "./dtos/auth.dto";
import { Result, err, ok } from "neverthrow";
import { IOptions, TRequest, UserByEmailCircuitBreakerService } from "./services/user-by-email.service";

export type AuthFindByEmail = Result<AuthUser, Error>;

function executeCircuitBreakerService(request:TRequest, options: IOptions) {
  const service = new UserByEmailCircuitBreakerService(request, options);
  return service;

}

export class AuthInfrastructure implements AuthRepository {

  private service: UserByEmailCircuitBreakerService;
  constructor(private readonly httpClientService: HttpClientService ) {

  }

  async getUserByEmail(email: string): Promise<AuthFindByEmail> {
    try {

      const options: IOptions = {
        maxFailures: 3,
        minSuccesses: 2,
        openBreakerTimeout: 5000,
        closeBreakerTimeout: 5000
      };

      const response = await executeCircuitBreakerService(this.httpClientService.request,options)
        .fire(Parameter.server_config.apiGetUser, "post", { email });

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