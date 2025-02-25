import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1, nullable: false })
  chinese: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pinyin?: string;

  @CreateDateColumn({ name: 'createdDate', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updatedDate', type: 'timestamp', nullable: true })
  updatedDate?: Date;
}
