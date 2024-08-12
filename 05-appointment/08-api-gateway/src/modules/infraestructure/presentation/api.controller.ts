import { Request, Response } from 'express';
import { APIApplication } from '../../application/api.application';


export class APIController {

    constructor(private readonly application: APIApplication) {}

    appointment = async (req:Request, res: Response) => {

        const data = req.body;
        const result = await this.application.endpoint("http://localhost:3020/v1/appointment","POST",data);

        if(result.isErr()) {
            return res.status(500).json({error: {...result}})
        }

        return res.status(201).json(result.value);
    }
}