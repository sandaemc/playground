export class Seller {
  constructor(protected id: string, protected name: string) {}

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }
}
