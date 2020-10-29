import { Report } from './report';

export class NotFoundError extends Error {
  private _reports: Report[];

  constructor(message: string, ...reports: Report[]) {
    super(message);
    this._reports = reports;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public get reports(): Report[] {
    return this._reports;
  }
}
