import { RequestResult } from "../../../modules/infraestructure/api.infraestructure";


export interface APIRepository {
    requestByType(url: string, method: string, data?: any): Promise<RequestResult>;
}