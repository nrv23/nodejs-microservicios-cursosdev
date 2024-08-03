import { User, UserProperties } from "../../domain/appointment";
import { RoleEntity } from "../entities/role.entity";
import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDomainToData(user: User): UserEntity {
    const props = user.properties();
    const userEntity = new UserEntity();
    userEntity.id = props.id;
    userEntity.name = props.name;
    userEntity.lastname = props.lastname;
    userEntity.email = props.email;
    userEntity.password = props.password;
    userEntity.createdAt = props.createdAt;
    userEntity.updatedAt = props.updatedAt;
    userEntity.deletedAt = props.deletedAt;
    userEntity.refreshToken = props.refreshToken;
    userEntity.roles = props.roles.map((rol: any) => {
      const roleEntity = new RoleEntity();
      roleEntity.id = rol;
      return roleEntity;
    })
    return userEntity;
  }

  static fromDataToDomain(
    data: UserEntity | UserEntity[]
  ): User | User[] {
   
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as User[];
    }

    const props: UserProperties = { ...data, roles: data.roles.map(rol => rol.id) };
    return new User(props);
  }
}
