import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false, comment: '文章标题' })
  title: string;

  @Column({ length: 20, nullable: false, comment: '作者' })
  author: string;

  @Column('text')
  content: string;

  @Column('tinyint')
  column: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
