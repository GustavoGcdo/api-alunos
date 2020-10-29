import { Request, Response } from 'express';
import { PaginarAlunosHandler } from '../handlers/paginar-alunos.handler';
import { ObterAlunoPorIdHandler } from '../handlers/obter-aluno-por-id.handler';
import { CriarAlunoHandler } from '../handlers/criar-aluno.handler';
import { AtualizarAlunoHandler } from '../handlers/atualizar-aluno.handler';
import { RemoverAlunoHandler } from '../handlers/remover-aluno.handler copy';
import { HandleResponse } from '../infra/handleResponse';
import { HttpStatus } from '../infra/http-status';
import { AlunoPaginateOptions } from '../models/aluno-paginate-options';
import { PaginateAlunoDto } from '../dto/paginate-aluno.dto';

export class AlunosController {
    private paginarAlunosHandler: PaginarAlunosHandler;
    private obterAlunoPorIdHandler: ObterAlunoPorIdHandler;
    private criarAlunoHandler: CriarAlunoHandler;
    private atualizarAlunoHandler: AtualizarAlunoHandler;
    private removerAlunoHandler: RemoverAlunoHandler;

    constructor() {
        this.paginarAlunosHandler = new PaginarAlunosHandler();
        this.obterAlunoPorIdHandler = new ObterAlunoPorIdHandler();
        this.criarAlunoHandler = new CriarAlunoHandler();
        this.atualizarAlunoHandler = new AtualizarAlunoHandler();
        this.removerAlunoHandler = new RemoverAlunoHandler();
    }

    public async paginarAlunos(request: Request, response: Response) {
        try {
            const { pagina, limite, nome } = request.query;
            const paginateOptions = { pagina, limite, nome } as PaginateAlunoDto;
            const result = await this.paginarAlunosHandler.handle(paginateOptions);
            return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
        } catch (error) {
            return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
        }
    }

    public async criarAluno(request: Request, response: Response) {
        try {
            const result = await this.criarAlunoHandler.handle(request.body);
            return HandleResponse.handle(response, HttpStatus.CREATED, result);
        } catch (error) {
            return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
        }
    }

    public async buscarAlunoPorId(request: Request, response: Response) {
        try {
            const result = await this.obterAlunoPorIdHandler.handle(request.params.id);
            return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
        } catch (error) {
            return HandleResponse.handleError(response, HttpStatus.NOT_FOUND, error);
        }
    }

    public async atualizarAluno(request: Request, response: Response) {
        try {
            const result = await this.atualizarAlunoHandler.handle(request.params.id, request.body);
            return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
        } catch (error) {
            return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
        }
    }

    public async removerAluno(request: Request, response: Response) {
        try {
            const result = await this.removerAlunoHandler.handle(request.params.id);
            return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
        } catch (error) {
            return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
        }
    }

}