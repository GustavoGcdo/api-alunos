import { CriarAlunoDto } from '../dto/criar-aluno.dto';
import { Report } from '../infra/report';
import { IContract } from '../infra/contract';

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

        const patterRGA = /\d{4}.\d{4}.\d{3}-\d{1}/
        const isInvalidRGA = !patterRGA.test(rga)

        if (isInvalidRGA) {
            this.reports.push({ name: 'rga', message: 'rga deve estar no formato NNNN.NNNN.NNN-N' })
        }

    }
}