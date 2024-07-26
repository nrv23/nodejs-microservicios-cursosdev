import {
  UserByPage,
  UserFound,
  UserFoundByIdOrEmail,
  UserSaved,
} from "../../infrastructure/user.infrastructure";
import { User } from "../auth";

export interface UserRepository {
  save(user: User): Promise<UserSaved>;
  findById(id: string): Promise<UserFoundByIdOrEmail>;
  find(): Promise<UserFound>;
  getByPage(page: number, pageSize: number): Promise<UserByPage>;
  getByEmail(email:string): Promise<UserFoundByIdOrEmail>;
}
