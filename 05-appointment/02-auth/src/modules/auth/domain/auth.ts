
export interface AuthEssentials {
  readonly email: string;
  readonly password: string;
}

export class Auth {

  private readonly email: string;
  private readonly password: string;

  constructor(props: AuthEssentials) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ._-]{8,}$/;

    if (!emailRegex.test(props.email)) throw new Error("Invalid Email");
    if (!passwordRegex.test(props.password)) throw new Error("Invalid Password");

    //Asignar valores al objeto 

    Object.assign(this, props);
  }


  get properties() {
    return {
      email: this.email,
      password: this.password
    }
  }
}