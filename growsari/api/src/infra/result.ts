export class Result<T> {
  protected constructor(
    protected success: boolean,
    protected error: string,
    protected value?: T
  ) {
    success = success;
    error = error;
    value = value;
  }

  static fail<T>(message: string): Result<T> {
    return new Result(false, message);
  }

  static ok<T>(value?: T) {
    return new Result(true, "", value);
  }

  static combine<T>(...results: Result<T>[]) {
    for (const result of results) if (result.failed) return result;

    return this.ok();
  }

  get failed() {
    return !this.success;
  }

  get errorMessage() {
    return this.error;
  }

  // TODO: neeed some conditional type return
  getValue(): T {
    return this.value as T;
  }
}
