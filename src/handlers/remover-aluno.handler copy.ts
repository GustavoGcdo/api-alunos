import { HttpStatus } from '../infra/http-status';
import { Result } from '../infra/result';
import { AlunosRepository } from '../repositories/alunos.repository';

export class RemoverAlunoHandler {
    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }

    public async handle(id: string): Promise<Result> {
        this._alunosRepository.remove(id);
        const result = new Result(null, 'aluno removido com sucesso', true, []);
        return result;
    };

}