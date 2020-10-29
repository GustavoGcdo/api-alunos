import { CriarAlunoDto } from '../dto/criar-aluno.dto';
import { Report } from '../infra/models/report';
import { IContract } from '../infra/models/contract';
import { PATTERN_RGA } from '../infra/constants';

export class CriarAlunoContract implements IContract {
    public reports: Report[];

    constructor() {
        this.reports = []
    }

    public validate(criarAlunoDto: CriarAlunoDto): boolean {
        const { nome, rga } = criarAlunoDto;
        this.validarNome(nome);
        this.validarRGA(rga);
        
        return this.reports.length === 0;
    }

    private validarNome(nome: string) {
        if (!nome || nome.trim().length == 0) {
            this.reports.push({ name: 'nome', message: 'nome é obrigatório' })
        }
    }

    private validarRGA(rga: string) {
        if (!rga || rga.trim().length == 0) {
            this.reports.push({ name: 'rga', message: 'rga é obrigatório' })
        }

        const isInvalidRGA = !PATTERN_RGA.test(rga)

        if (isInvalidRGA) {
            this.reports.push({ name: 'rga', message: 'rga deve estar no formato NNNN.NNNN.NNN-N' })
        }

    }
}