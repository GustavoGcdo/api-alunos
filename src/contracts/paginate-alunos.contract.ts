import { IContract } from '../infra/models/contract';
import { Report } from '../infra/models/report';
import { PaginateAlunoDto } from '../dto/paginate-aluno.dto';
import { MAX_LIMIT, MIN_LIMIT } from '../infra/constants';

export class PaginateAlunosContract implements IContract {
    reports: Report[];

    constructor() {
        this.reports = [];
    }

    validate(dto: PaginateAlunoDto): boolean {
        const { pagina, limite } = dto;

        if (pagina) {
            this.validarPagina(pagina);
        }

        if (limite) {
            this.validarLimite(limite);
        }

        return this.reports.length === 0;
    }

    private validarPagina(pagina: string) {
        const isInvalidNumber = this.NaoEhUmNumeroValido(pagina);
        if (isInvalidNumber) {
            this.reports.push({ name: 'pagina', message: 'pagina deve ser um numero valido' });
        }
        
        if (parseInt(pagina) <= 0) {
            this.reports.push({ name: 'pagina', message: 'pagina deve ser um numero maior que zero' });
        }
    }

    private validarLimite(limite: string) {
        const isInvalidNumber = this.NaoEhUmNumeroValido(limite);
        if (isInvalidNumber) {
            this.reports.push({ name: 'limite', message: 'limite deve ser um numero valido' });
        }

        if (parseInt(limite) > MAX_LIMIT) {
            this.reports.push({ name: 'limite', message: `limite deve ser menor que ${MAX_LIMIT}` });
        }
        
        if (parseInt(limite) < MIN_LIMIT) {
            this.reports.push({ name: 'limite', message: `limite deve ser maior que ${MIN_LIMIT}` });
        }
    }

    private NaoEhUmNumeroValido(valor: string) {
        const number = parseInt(valor);
        return isNaN(number);
    }

}