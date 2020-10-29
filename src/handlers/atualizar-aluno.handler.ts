import { AtualizarAlunoContract } from '../contracts/atualizar-aluno.contract';
import { AtualizarAlunoDto } from '../dto/atualizar-aluno.dto';
import { NotFoundError } from '../infra/NotFoundError';
import { Result } from '../infra/result';
import { ValidationFailedError } from '../infra/validationFailedError';
import { Aluno } from '../models/aluno';
import { AlunosRepository } from '../repositories/alunos.repository';

export class AtualizarAlunoHandler {

    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }

    public async handle(id: string, atualizarAlunoDto: AtualizarAlunoDto): Promise<Result> {
        this.validar(atualizarAlunoDto);
        await this.validarExistenciaUsuario(id);

        const novosDadosAluno = { ...atualizarAlunoDto } as Aluno;
        await this._alunosRepository.update(id, novosDadosAluno);

        const result = new Result(null, 'aluno atualizado com sucesso', true, []);
        return result;
    };

    private validar(atualizarAlunoDto: AtualizarAlunoDto) {
        const contract = new AtualizarAlunoContract();
        const isInvalid = !contract.validate(atualizarAlunoDto);

        if (isInvalid) {
            throw new ValidationFailedError("falha ao atualizar aluno", ...contract.reports);
        }
    }


    private async validarExistenciaUsuario(id: string) {
        const alunoEncontrado = await this._alunosRepository.getById(id);

        if (!alunoEncontrado) {
            throw new NotFoundError("falha ao atualizar aluno", { name: 'aluno', message: 'aluno nao encontrado' });
        }
    }
}