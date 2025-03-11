import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity() 
export class GroupedVocabList {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    name: string;
  
}