import uuid from 'uuid'

export class CartId {
  private id: string

  constructor(value: string) {
    if (!value) {
      throw new Error('Cart ID is missing')
    }

    this.id = value
  }

  static create() {
    return new CartId(uuid.v4())
  }

  toString() {
    return this.id
  }
}
