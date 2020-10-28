import { Result } from '../infra/result';
import alunosRepository from '../repositories/alunos.repository';
import { HttpStatus } from '../infra/http-status';

export class CriarAlunoHandler {

    private _alunosRepository = alunosRepository;

    public async handle(createAlunoDto: any): Promise<Result> {
        const alunoCriado = await this._alunosRepository.create(createAlunoDto);        
        const result = new Result(alunoCriado, 'aluno criado com sucesso', true, [], HttpStatus.SUCCESS);
        return result;
    };

}