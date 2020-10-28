import { Situacao } from '../enums/situacao.enum';
import { Aluno } from '../models/aluno';

class AlunosRepository {

    private _alunos: Aluno[] = [];

    async paginate(): Promise<Aluno[]> {
        return this._alunos;
    }

    async create(aluno: Aluno): Promise<Aluno> {
        const alunoTeste: Aluno = {
            ...aluno,
            id: Date.now().toString(),
            nome: 'teste',
            curso: 'TAD',
            rga: '201819070573',
            registradoEm: new Date(),
            situacao: Situacao.ATIVO,
        };

        this._alunos.push(alunoTeste);

        return alunoTeste;
    }

    async update(id: string, aluno: Aluno): Promise<Aluno> {
        const index = this._alunos.findIndex(a => a.id === id);
        const oldAluno = this._alunos[index]
        const newAluno = { ...oldAluno, ...aluno };
        this._alunos[index] = newAluno;
        return newAluno;
    }

    async getById(id: string): Promise<Aluno | undefined> {
        const alunoEncontrado = this._alunos.find(a => a.id === id);
        return alunoEncontrado;
    }

    async remove(id: string): Promise<void> {
        this._alunos = this._alunos.filter(a => a.id !== id);
    }
}


export default new AlunosRepository();