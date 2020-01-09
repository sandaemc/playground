import uuid from 'uuid'

export class Seller {
  protected id: string

  constructor(protected name: string) {
    this.id = uuid.v4()
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }
}
