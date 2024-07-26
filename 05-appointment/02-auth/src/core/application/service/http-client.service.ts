import axios from "axios";

export class HttpClientService {

    async request(url: string, method: string, body: object, headers: object = {}) {
        const { status, data } = await axios(url, {
            method,
            data: body,
            headers
        });

        return data;
    }
}