

export class AuthUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  roles: number[];
  password: string;
}

export class AuthDto {
  static fromDataToDomail(auth: any): AuthUser {
    const authUser = new AuthUser();

    authUser.id = auth.id;
    authUser.name = auth.name;
    authUser.lastname = auth.lastname;
    authUser.email = auth.email;
    authUser.roles = auth.roles;
    authUser.password = auth.password;
    return authUser;
  }
}
