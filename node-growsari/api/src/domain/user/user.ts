import * as uuid from "uuid";
import { encrypt } from "../../infra/password";

export class User {
  protected passwordHash?: string;
  protected passwordSalt?: string;

  private constructor(
    protected id: string,
    protected name: string,
    protected email: string,
    protected createdAt: Date,
    protected updatedAt: Date
  ) {}

  setPassword(password: string) {
    const { hash, salt } = encrypt(password);
    this.passwordHash = hash;
    this.passwordSalt = salt;
  }

  static create(name: string, email: string) {
    return new User(uuid.v1(), name, email, new Date(), new Date());
  }
}
