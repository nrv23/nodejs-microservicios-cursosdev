import axios from "axios";

export class HttpClientService {

    async request(url: string, method: string, body: object, headers: object = {}) {
        const { data } = await axios(url, {
            method,
            data: body,
            headers
        });

        return data;
    }
}