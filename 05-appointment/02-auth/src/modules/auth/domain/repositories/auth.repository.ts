import { AuthFindByEmail } from "../../infrastructure/auth.infrastructure";

export type AuthTokens = {
  access_token: string;
  refreshToken: string;
}

export interface AuthRepository {

    getUserByEmail(email: string): Promise<AuthFindByEmail>;

}