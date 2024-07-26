import { User } from "../../domain/auth";

export class UserResponse  {

    id: string;
    name: string;
    lastname: string;
    email: string;
    roles: number[];
}

export class UserResponseDto {
    
    static fromDomainToResponse(user: User | User[]): UserResponse | UserResponse[] {
        console.log({user})
        if(Array.isArray(user)) return user.map(item => this.fromDomainToResponse(item)) as UserResponse[];

        const props = user.properties();
        const userResponse = new UserResponse();

        userResponse.id = props.id;
        userResponse.name = props.name;
        userResponse.lastname = props.lastname;
        userResponse.email = props.email;
        userResponse.roles = props.roles;

        return userResponse
    }
}