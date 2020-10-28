import { HttpStatus } from '../infra/http-status';
import { Result } from '../infra/result';
import { AlunosRepository } from '../repositories/alunos.repository';

export class AtualizarAlunoHandler {

    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }

    public async handle(id: string, atualizarAlunoDto: any): Promise<Result> {
        const alunoAtualizado = await this._alunosRepository.update(id, atualizarAlunoDto);
        const result = new Result(alunoAtualizado, 'aluno atualizado com sucesso', true, []);
        return result;
    };

}