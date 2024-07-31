import { NextFunction, Request, Response } from "express";
import { AuthApplication } from "./../../../application/auth.application";
import { Auth } from "../../../../../modules/auth/domain/auth";

export class AuthController  {

  constructor(
    private readonly authApplication: AuthApplication
  ){}

  login = async (req: Request, res: Response, next: NextFunction) => {
    const {
      email,
      password
    } = req.body;
    const auth = new Auth({email, password});
    const response = await this.authApplication.login(auth);

    if(response.isErr()){
      return res.status(+response.error.status).json(response.error);
    }
    
    res.status(200).json(response.value);
  }
}