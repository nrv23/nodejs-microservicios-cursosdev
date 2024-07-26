import { validate } from "uuid";
// modelo de negocio
export interface UserEssentials {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: number[];
}

export interface UserOptionals {
  id: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type UserProperties = UserEssentials & Partial<UserOptionals>;
export type UserUpdate = Partial<UserEssentials>;
export class User {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private email: string;
  private password: string;
  private roles: number[];
  private refreshToken: string;
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(user: UserProperties) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ._-]{8,}$/;

    if (!validate(user.id)) throw new Error("Invalid id");
    if (user.name.length < 3) throw new Error("Invalid name");
    if (user.lastname.length < 3) throw new Error("Invalid lastname");
    if (!emailRegex.test(user.email)) throw new Error("Invalid email");
    //if (!passwordRegex.test(user.password)) throw new Error("Invalid password");
    if(user.roles.length === 0) throw new Error("El usuario debe tener al menos un rol");
    if(!validate(user.refreshToken)) throw new Error("Invalid refresh token");

    Object.assign(this, user);
    if(!user.createdAt) this.createdAt = new Date();
  }

  properties() {
    return {
      id: this.id,      
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roles: this.roles,
      refreshToken: this.refreshToken,    
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }

  update(fieldsToUpdate: UserUpdate) {
    Object.assign(this, fieldsToUpdate);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
