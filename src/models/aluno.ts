import { Situacao } from '../enums/situacao.enum';

export interface Aluno {
    id: string;
    rga: string;
    nome: string;
    curso: string;
    situacao: Situacao;
    registradoEm: Date;
}