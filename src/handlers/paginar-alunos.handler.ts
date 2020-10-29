import { PaginateAlunosContract } from '../contracts/paginate-alunos.contract';
import { PaginateAlunoDto } from '../dto/paginate-aluno.dto';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../infra/constants';
import { ValidationFailedError } from '../infra/errors/validation-failed.error';
import { Result } from '../infra/models/result';
import { AlunoPaginateOptions } from '../models/aluno-paginate-options';
import { AlunosRepository } from '../repositories/alunos.repository';

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
        let defaultPage = DEFAULT_PAGE;
        let defaultLimit = DEFAULT_LIMIT;

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