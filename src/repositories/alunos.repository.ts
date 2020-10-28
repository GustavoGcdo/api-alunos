import { getRepository } from 'typeorm';
import { Aluno } from '../models/aluno';

export class AlunosRepository {

    async paginate(): Promise<Aluno[]> {
        const alunosEncontrados = await getRepository(Aluno).find({});        
        return alunosEncontrados;
    }

    async create(novoAluno: Aluno): Promise<Aluno> {
        const result = await getRepository(Aluno).insert(novoAluno);
        return result.raw;
    }

    async update(id: string, aluno: Aluno): Promise<void> {
        await getRepository(Aluno).update({id: id}, {...aluno});
    }

    async getById(id: string): Promise<Aluno | undefined> {
        const alunoEncontrado = await getRepository(Aluno).findOne({id});        
        return alunoEncontrado;
    }

    async remove(id: string): Promise<void> {
        const result = await getRepository(Aluno).delete({id});        
        console.log(result);
    }
}
