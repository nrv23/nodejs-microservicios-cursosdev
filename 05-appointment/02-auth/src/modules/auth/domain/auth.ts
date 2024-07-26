
export interface AuthEssentials {
  readonly email: string;
  readonly password: string;
}

export class Auth {

  private readonly email: string;
  private readonly password: string;

  constructor(props: AuthEssentials) {

  }
}