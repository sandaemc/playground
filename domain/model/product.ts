export class Product {
  constructor(
    protected id: string,
    protected name: string,
    protected description: string
  ) {}

  getId() {
    return this.id
  }
}
