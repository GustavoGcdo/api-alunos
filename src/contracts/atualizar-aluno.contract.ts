import { AtualizarAlunoDto } from '../dto/atualizar-aluno.dto';
import { Situacao } from '../enums/situacao.enum';
import { IContract } from '../infra/models/contract';
import { Report } from '../infra/models/report';
import { PATTERN_RGA } from '../infra/constants';

export class AtualizarAlunoContract implements IContract {
    public reports: Report[];

    constructor() {
        this.reports = []
    }

    public validate(atualizarAlunoDto: AtualizarAlunoDto): boolean {
        const { rga, situacao } = atualizarAlunoDto;

        if (rga) {
            this.validarRGA(rga);
        }

        if (situacao) {
            this.validarSituacao(situacao);
        }


        return this.reports.length === 0;
    }

    private validarRGA(rga: string) {
        const isInvalidRGA = !PATTERN_RGA.test(rga)

        if (isInvalidRGA) {
            this.reports.push({ name: 'rga', message: 'rga deve estar no formato NNNN.NNNN.NNN-N' })
        }
    }

    private validarSituacao(situacao: string) {
        const naoEhUmaSituacaoValida = !Object.values(Situacao).some((v) => v === situacao);
        if (naoEhUmaSituacaoValida) {
            this.reports.push({ name: 'situacao', message: `digite uma situacao valida: ${Object.values(Situacao).join(', ')}` });
        }
    }
}