import uuid from 'uuid'

export class ProductId {
  private id: string

  constructor(value: string) {
    if (!value) {
      throw new Error('Product ID is missing')
    }

    this.id = value
  }

  static create() {
    return new ProductId(uuid.v4())
  }

  toString() {
    return this.id
  }
}
