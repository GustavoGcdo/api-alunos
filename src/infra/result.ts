import { Report } from './report';
export class Result {
    data: any;
    message: string;
    success: boolean;
    errors: Report[];
    statusCode: number;
  
    constructor(data: any, message: string, success: boolean, errors: Report[], statusCode: number) {
      this.data = data;
      this.message = message;
      this.success = success;
      this.errors = errors;
      this.statusCode = statusCode;
    }
  }
  