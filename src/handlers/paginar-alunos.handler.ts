import { HttpStatus } from '../infra/http-status';
import { Result } from '../infra/result';
import { AlunosRepository } from '../repositories/alunos.repository';
import { AlunoPaginateOptions } from '../models/aluno-paginate-options';
import { PaginateAlunoDto } from '../dto/paginate-aluno.dto';

export class PaginarAlunosHandler {
    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }

    public async handle(paginateAlunoDto: PaginateAlunoDto): Promise<Result> {
        const alunoPaginateOptions = this.getPaginateOptions(paginateAlunoDto);
        const data = await this._alunosRepository.paginate(alunoPaginateOptions);
        const result = new Result(data, 'alunos trazidos com sucesso', true, []);
        return result;
    };

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
            limit: defaultLimit,
            offset,
        }

        if(paginateAlunoDto.nome){
            alunoPaginateOptions.nome = paginateAlunoDto.nome;
        }

        return alunoPaginateOptions;
    }

}