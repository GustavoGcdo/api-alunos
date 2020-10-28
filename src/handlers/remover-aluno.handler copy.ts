import { HttpStatus } from '../infra/http-status';
import { Result } from '../infra/result';
import alunosRepository from '../repositories/alunos.repository';

export class RemoverAlunoHandler {
    private _alunosRepository = alunosRepository;

    public async handle(id: string): Promise<Result> {
        this._alunosRepository.remove(id);
        const result = new Result(null, 'aluno removido com sucesso', true, [], HttpStatus.SUCCESS);
        return result;
    };

}