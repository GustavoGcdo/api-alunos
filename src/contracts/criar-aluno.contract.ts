import { CriarAlunoDto } from '../dto/criar-aluno.dto';
import { Report } from '../infra/report';
import { IContract } from '../infra/contract';

export class CriarAlunoContract implements IContract {
    public reports: Report[] = [];

    public validate(criarAlunoDto: CriarAlunoDto): boolean {
        const {} = criarAlunoDto;

        return false;
    }
}