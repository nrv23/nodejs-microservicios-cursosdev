import axios, { AxiosRequestConfig } from "axios";
import { err, ok, Result } from "neverthrow";
import { APIRepository } from "../domain/repository/api.repository";

export type RequestResult = Result<any, Error>;

export class APIInfraestructure implements APIRepository {
    async requestByType(url: string, method: string, data?: any): Promise<RequestResult> {

        const request: AxiosRequestConfig = {
            url,
            method,
            data,
            responseType: "json" // siempre va devolver un json como respuesta
        }

        try {

            const response = await axios.request(request);
            return ok(response.data);
            
        } catch (error) {
            const objError = new Error("Error al enviar la solicitud "+ JSON.stringify({error}));
            return err(objError);
        }
    }
}