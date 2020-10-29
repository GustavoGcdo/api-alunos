import { HttpStatus } from '../infra/enums/http-status';
import { Result } from '../infra/models/result';
import { AlunosRepository } from '../repositories/alunos.repository';
import { AlunoPaginateOptions } from '../models/aluno-paginate-options';
import { PaginateAlunoDto } from '../dto/paginate-aluno.dto';
import { PaginateAlunosContract } from '../contracts/paginate-alunos.contract';
import { ValidationFailedError } from '../infra/errors/validation-failed.error';

export class PaginarAlunosHandler {
    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }

    public async handle(paginateAlunoDto: PaginateAlunoDto): Promise<Result> {
        this.validar(paginateAlunoDto);
        const alunoPaginateOptions = this.getPaginateOptions(paginateAlunoDto);
        const [results, count] = await this._alunosRepository.paginate(alunoPaginateOptions);
        
        const resultPaginate = {
            results,
            total: count,
            page: alunoPaginateOptions.page,
            limit: alunoPaginateOptions.limit,
            offset: alunoPaginateOptions.offset
        }

        const result = new Result(resultPaginate, 'alunos trazidos com sucesso', true, []);
        return result;
    };

    private validar(paginateAlunoDto: PaginateAlunoDto) {
        const contract = new PaginateAlunosContract();
        const isInvalid = !contract.validate(paginateAlunoDto);

        if (isInvalid) {
            throw new ValidationFailedError("falha ao buscar alunos", ...contract.reports);
        }
    }

    private getPaginateOptions(paginateAlunoDto: PaginateAlunoDto): AlunoPaginateOptions {
        let defaultPage = 1;
        let defaultLimit = 25;

        if (paginateAlunoDto?.pagina) {
            defaultPage = parseInt(paginateAlunoDto.pagina);
        }

        if (paginateAlunoDto?.limite) {
            defaultLimit = parseInt(paginateAlunoDto.limite);
        }

        const offset = (defaultPage - 1) * defaultLimit;

        const alunoPaginateOptions: AlunoPaginateOptions = {
            page: defaultPage,
            limit: defaultLimit,
            offset,
        }

        if (paginateAlunoDto.nome) {
            alunoPaginateOptions.nome = paginateAlunoDto.nome;
        }

        return alunoPaginateOptions;
    }

}