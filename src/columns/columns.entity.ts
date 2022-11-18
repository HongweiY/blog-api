import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('columns')
export class ColumnsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 100 })
  avatar: string;

  @Column('text')
  description: string;

  @Column('datetime')
  createdAt: string;
}
