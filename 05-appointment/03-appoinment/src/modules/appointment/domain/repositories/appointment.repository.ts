import {
  UserByPage,
  UserFound,
  UserFoundByIdOrEmail,
  UserSaved,
} from "../../infrastructure/appointment.infrastructure";
import { User } from "../appointment";

export interface UserRepository {
  save(user: User): Promise<UserSaved>;
  findById(id: string): Promise<UserFoundByIdOrEmail>;
  find(): Promise<UserFound>;
  getByPage(page: number, pageSize: number): Promise<UserByPage>;
  getByEmail(email:string): Promise<UserFoundByIdOrEmail>;
}
