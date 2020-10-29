import { PaginateOptions } from '../infra/models/paginate-options';

export interface AlunoPaginateOptions extends PaginateOptions {
    nome?: string;
}