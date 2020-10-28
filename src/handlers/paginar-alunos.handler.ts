import { HttpStatus } from '../infra/http-status';
import { Result } from '../infra/result';
import alunosRepository from '../repositories/alunos.repository';
export class PaginarAlunosHandler {

    private _alunosRepository = alunosRepository;

    public async handle(): Promise<Result> {
        const data = await this._alunosRepository.paginate();
        const result = new Result(data, 'alunos trazidos com sucesso', true, [], HttpStatus.SUCCESS);
        return result;
    };

}