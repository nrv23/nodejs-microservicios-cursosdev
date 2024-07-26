import { HttpClientService } from "src/core/application/service/http-client.service";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { Parameter } from "src/core/parameter";
import { AxiosError } from "axios";


export class AuthInfrastructure implements AuthRepository {
  constructor(private readonly httpClientService: HttpClientService) {

  }
  async getUserByEmail(email: string): Promise<any> {

    try {

      const response = await this.httpClientService.request(Parameter.server_config.apiGetUser, "post", { email });
      return response;

    } catch (error) {
      
      if(error instanceof AxiosError) {
        if(error.response.status === 404) {

        }
      } else {
        
      }
    }
  }

}