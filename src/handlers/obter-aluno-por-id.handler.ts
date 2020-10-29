import { HttpStatus } from '../infra/enums/http-status';
import { Result } from '../infra/models/result';
import { ValidationFailedError } from '../infra/errors/validation-failed.error';
import { AlunosRepository } from '../repositories/alunos.repository';

export class ObterAlunoPorIdHandler {
    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }

    public async handle(id: string): Promise<Result> {
        const alunoEncontrado = await this._alunosRepository.getById(id);

        if (!alunoEncontrado) {
            throw new ValidationFailedError("falha ao buscar aluno", { name: 'aluno', message: 'aluno nao encontrado' });
        }

        const result = new Result(alunoEncontrado, 'aluno encontrado com sucesso', true, []);
        return result;
    };

}