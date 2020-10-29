import { NotFoundError } from '../infra/errors/not-found.error';
import { Result } from '../infra/models/result';
import { AlunosRepository } from '../repositories/alunos.repository';

export class RemoverAlunoHandler {
    private _alunosRepository: AlunosRepository;

    constructor() {
        this._alunosRepository = new AlunosRepository();
    }

    public async handle(id: string): Promise<Result> {
        await this.validarExistenciaUsuario(id);        
        await this._alunosRepository.remove(id);
        const result = new Result(null, 'aluno removido com sucesso', true, []);
        return result;
    };

    private async validarExistenciaUsuario(id: string) {
        const alunoEncontrado = await this._alunosRepository.getById(id);

        if (!alunoEncontrado) {
            throw new NotFoundError("falha ao remover aluno", { name: 'aluno', message: 'aluno nao encontrado' });
        }
    }

}