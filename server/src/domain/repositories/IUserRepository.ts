import { User } from "../entities/User";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
}
