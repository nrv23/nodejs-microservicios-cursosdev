
export type AuthTokens = {
  access_token: string;
  refreshToken: string;
}

export interface AuthRepository {

    getUserByEmail(email: string): Promise<any>;

}