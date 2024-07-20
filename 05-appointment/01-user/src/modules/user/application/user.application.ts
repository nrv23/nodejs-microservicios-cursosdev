import { User, UserProperties } from "../domain/user";
import { UserRepository } from "../domain/repositories/user";

export class UserApplication {
  constructor(private readonly repository: UserRepository) { }

  async save(product: User) {
    await this.repository.save(product);
  }

  async delete(id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }
    const product = result.value;
    product.delete();
    return await this.repository.save(product);
  }

  async update(fields: UserProperties, id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }
    const product = result.value;
    product.update(fields);
    await this.repository.save(product);
  }

  async findById(id: string) {
    const result = await this.repository.findById(id);
    if (result.isErr()) {
      return;
    }

    return result.value;
  }

  async find() {
    const result = await this.repository.find();
    if (result.isErr()) {
      return;
    }

    return result.value;
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
