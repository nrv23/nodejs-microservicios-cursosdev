import { User, UserProperties } from "../domain/user";
import { UserRepository } from "../domain/repositories/user";
import { BcryptService } from "../../../core/application/service/bcrypt.service";
import { UserResponseDto } from "./dto/user-response.dto";

export class UserApplication {
  constructor(
    private readonly repository: UserRepository,
    private readonly bcryptService: BcryptService) { }

  async save(user: User) {
    const password = await this.bcryptService.hashPass(user.properties().password);
    user.update({ password });
    await this.repository.save(user);
  }

  async delete(id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }
    const user = result.value;
    user.delete();
    return await this.repository.save(user);
  }

  async update(fields: UserProperties, id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }

    console.log({ result });
    const user = result.value;
    user.update(fields);
    await this.repository.save(user);
  }

  async findById(id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }

    return UserResponseDto.fromDomainToResponse(result.value);
  }

  async find() {
    const result = await this.repository.find();
    if (result.isErr()) {
      return;
    }
    return UserResponseDto.fromDomainToResponse(result.value);
  }

  async getByPage(page: number, pageSize: number) {
    const result = await this.repository.getByPage(page, pageSize);
    if (result.isErr()) {
      return;
    }

    return result.value;
  }

  async getByEmail(email: string) {
    const result = await this.repository.getByEmail(email);
    if (result.isErr()) {
      return;
    }

    return result.value;
  }
}
