import { APIRepository } from "../domain/repository/api.repository";



export class APIApplication  {
    constructor(private readonly apiRepository: APIRepository) {

    }

    async endpoint(url: string, method: string, data?:any) {
        return await this.apiRepository.requestByType(url,method,data);
    }
}