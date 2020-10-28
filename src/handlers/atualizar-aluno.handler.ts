import { Result } from '../infra/result';
import alunosRepository from '../repositories/alunos.repository';
import { HttpStatus } from '../infra/http-status';

export class AtualizarAlunoHandler {

    private _alunosRepository = alunosRepository;

    public async handle(id: string, atualizarAlunoDto: any): Promise<Result> {
        const alunoAtualizado = await this._alunosRepository.update(id, atualizarAlunoDto);
        const result = new Result(alunoAtualizado, 'aluno atualizado com sucesso', true, [], HttpStatus.SUCCESS);
        return result;
    };

}