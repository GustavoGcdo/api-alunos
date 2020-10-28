import { HttpStatus } from '../infra/http-status';
import { Result } from '../infra/result';
import { AlunosRepository } from '../repositories/alunos.repository';

export class ObterAlunoPorIdHandler {
    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }

    public async handle(id: string): Promise<Result> {
        const alunoEncontrado = await this._alunosRepository.getById(id);
        const result = new Result(alunoEncontrado, 'aluno encontrado com sucesso', true, []);
        return result;
    };

}