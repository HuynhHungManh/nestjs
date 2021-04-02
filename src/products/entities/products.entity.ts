import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Products {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;

     @Column()
     description: string;

     @Column()
     price: string;
}
