export class CreateResourceDTO {
  constructor(public name: string, public host: string) {}
}

export class UpdateResourceDTO {
  constructor(public host: string) {}
}
