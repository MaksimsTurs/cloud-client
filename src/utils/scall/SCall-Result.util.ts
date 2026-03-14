class SCallResult<R = unknown, E = unknown> {
  constructor(data?: R, error?: E) {
    this.data = data;
    this.error = error;
  };

  public getData(): R | undefined {
    return this.data;
  };

  public getError(): E | undefined {
    return this.error;
  };

  private data: R | undefined = undefined;
  private error: E | undefined = undefined;
};

export default SCallResult;
