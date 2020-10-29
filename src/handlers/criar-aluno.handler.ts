import { CriarAlunoContract } from '../contracts/criar-aluno.contract';
import { CriarAlunoDto } from '../dto/criar-aluno.dto';
import { HttpStatus } from '../infra/enums/http-status';
import { Result } from '../infra/models/result';
import { ValidationFailedError } from '../infra/errors/validation-failed.error';
import { Aluno } from '../models/aluno';
import { AlunosRepository } from '../repositories/alunos.repository';

export class CriarAlunoHandler {

    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }

    public async handle(criarAlunoDto: CriarAlunoDto): Promise<Result> {

        this.validar(criarAlunoDto);
        const alunoCriado = await this.criarNovoAluno(criarAlunoDto);
        const result = new Result(alunoCriado, 'aluno criado com sucesso', true, []);
        return result;
    };


    private validar(criarAlunoDto: CriarAlunoDto) {
        const contract = new CriarAlunoContract();
        const isInvalid = !contract.validate(criarAlunoDto);

        if (isInvalid) {
            throw new ValidationFailedError("falha ao criar aluno", ...contract.reports);
        }
    }

    private async criarNovoAluno(criarAlunoDto: CriarAlunoDto) {
        const novoAluno = {
            registradoEm: new Date(),
            ...criarAlunoDto
        } as Aluno;

        const alunoCriado = await this._alunosRepository.create(novoAluno);
        return alunoCriado;
    }


}