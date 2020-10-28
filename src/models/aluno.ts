import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Situacao } from '../enums/situacao.enum';

@Entity()
export class Aluno {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    rga!: string;

    @Column()
    nome!: string;

    @Column()
    curso?: string;

    @Column({ type: 'text', enum: Situacao, default: Situacao.ATIVO })
    situacao!: Situacao;

    @Column()
    registradoEm!: Date;
}