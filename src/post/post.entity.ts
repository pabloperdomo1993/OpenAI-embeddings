import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column({ type: 'simple-array' })
    vectorField: number[];

    @Column()
    createAt: Date;
}