import { err, ok, Result } from "neverthrow";
import { IsNull } from "typeorm";

import { MysqlBootstrap } from "../../../bootstrap/mysql.bootstrap";
import { User } from "../domain/user";
import { UserRepository } from "../domain/repositories/user";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

export type UserFoundByIdOrEmail = Result<User | null, Error>;
export type UserFound = Result<User[] | null, Error>;
export type UserByPage = Result<[User[], number] | null, Error>;
export type UserSaved = Result<void, Error>;

export class UserInfrastructure implements UserRepository {

  async getByEmail(email: string): Promise<UserFoundByIdOrEmail> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const userEntity = await repository.findOne({
        where: { email, deletedAt: IsNull() },
        relations: ["roles"]
      });

      if (!userEntity) {
        return ok(null);
      }

      return ok(UserDto.fromDataToDomain(userEntity) as User);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async save(product: User): Promise<UserSaved> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const productEntity = UserDto.fromDomainToData(product);

      await repository.save(productEntity);
      return ok(undefined);
    } catch (error) {
      return this.handleError(error);
    }
  }
  async findById(id: string): Promise<UserFoundByIdOrEmail> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const productEntity = await repository.findOne({
        where: { id, deletedAt: IsNull() },
        relations: ["roles"]
      });
      if (!productEntity) {
        return ok(null);
      }

      return ok(UserDto.fromDataToDomain(productEntity) as User);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async find(): Promise<UserFound> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const users = await repository.find({
        where: { deletedAt: IsNull() },
        relations: ["roles"]
      });
      console.log({users})
      if (!users) {
        return ok(null);
      }
      // ok es donde se carga la respuesta
      return ok(UserDto.fromDataToDomain(users) as User[]);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getByPage(page: number, pageSize: number): Promise<UserByPage> {
    try {

      console.log({page,pageSize});
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const [user, count] = await repository.findAndCount({
        where: { deletedAt: IsNull() },
        relations: ["roles"],
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      if (!user) {
        return ok(null);
      }
      

      const productsDomain = UserDto.fromDataToDomain(user) as User[];
      return ok([productsDomain, count]);
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
