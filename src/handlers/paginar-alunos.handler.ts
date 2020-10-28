import { HttpStatus } from '../infra/http-status';
import { Result } from '../infra/result';
import { AlunosRepository } from '../repositories/alunos.repository';

export class PaginarAlunosHandler {
    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }
    
    public async handle(): Promise<Result> {
        const data = await this._alunosRepository.paginate();
        const result = new Result(data, 'alunos trazidos com sucesso', true, []);
        return result;
    };

}