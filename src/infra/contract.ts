import { Report } from './report';
export interface IContract {
    reports: Report[];
    validate(dto: any): boolean;
}