import uuid from 'uuid'

export class SellerId {
  private id: string

  constructor(value: string) {
    if (!value) {
      throw new Error('Seller ID is missing')
    }

    this.id = value
  }

  static create() {
    return new SellerId(uuid.v4())
  }

  toString() {
    return this.id
  }
}
