import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { UserApplication } from '../../../application/user.application';
import { User, UserProperties } from '../../../domain/user';
import { UserResponseDto } from '../../../../../modules/user/application/dto/user-response.dto';

export class UserController {
  constructor(private readonly application: UserApplication) { }

  insert = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const id = uuidv4();
    const refreshToken = uuidv4();
    const userProperties: UserProperties = body;
    const user = new User({ ...userProperties, id, refreshToken });

    await this.application.save(user);

    res.status(201).send();
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const product = await this.application.findById(id);

    res.status(200).json(product);
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.application.find();
    res.status(200).json(users);
  }

  getByPage = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);

    const result = await this.application.getByPage(page, pageSize);
    
    if (!result) {
      res.status(204).send();
      return;
    }
    const [users, count] = result;

    const data = UserResponseDto.fromDomainToResponse(users);

    res.status(200).json({ data, count, page, pageSize });
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const body = req.body;

    const userProperties: UserProperties = body;

    await this.application.update(userProperties, id);

    res.status(204).send();
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await this.application.delete(id);
    res.status(204).send();
  }
}
