import { getRepository } from 'typeorm';
import { Aluno } from '../models/aluno';
import { AlunoPaginateOptions } from '../models/aluno-paginate-options';

export class AlunosRepository {

    async paginate(options: AlunoPaginateOptions ): Promise<Aluno[]> {
        const queryBuilder = await getRepository(Aluno).createQueryBuilder('aluno')           
        
        if(options.nome){
            queryBuilder.where("aluno.nome LIKE :nome", { nome: `%${options.nome}%` });
        }

        const result = queryBuilder.offset(options.offset).limit(options.limit).getMany();
        return result;
    }

    async create(novoAluno: Aluno): Promise<Aluno> {
        const result = await getRepository(Aluno).insert(novoAluno);
        return result.raw;
    }

    async update(id: string, aluno: Aluno): Promise<void> {
        await getRepository(Aluno).update({ id: id }, { ...aluno });
    }

    async getById(id: string): Promise<Aluno | undefined> {
        const alunoEncontrado = await getRepository(Aluno).findOne({ id });
        return alunoEncontrado;
    }

    async remove(id: string): Promise<void> {
        const result = await getRepository(Aluno).delete({ id });
        console.log(result);
    }
}
