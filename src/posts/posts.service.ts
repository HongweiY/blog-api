import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';

export interface PostRo {
  list: PostsEntity[];
  count: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  //创建文章
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await this.postsRepository.findOne({ where: { title } });
    console.log(doc);
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postsRepository.save(post);
  }

  //查找全部文章
  async findAll(query): Promise<PostRo> {
    const qb = await getRepository(PostsEntity).createQueryBuilder('post');
    qb.where('1=1');
    qb.orderBy('post.create_time', 'DESC');
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageNum * (pageSize - 1));
    const postList = await qb.getMany();
    return { list: postList, count: count };
  }

  //查找指定文章
  async findById(id): Promise<PostsEntity> {
    return await this.postsRepository.findOneBy({ id });
  }

  //更新文章
  async updateById(id, post): Promise<PostsEntity> {
    //判断文章是否存在
    const exitPost = await this.postsRepository.findOneBy({ id });
    if (!exitPost) {
      throw new HttpException('文章不存在', 401);
    }
    const updatePost = this.postsRepository.merge(exitPost, post);
    return this.postsRepository.save(updatePost);
  }

  //删除文章
  async deletePost(id): Promise<PostsEntity> {
    const exitPost = await this.postsRepository.findOneBy({ id });
    if (!exitPost) {
      throw new HttpException('文章不存在', 401);
    }
    return await this.postsRepository.remove(exitPost);
  }
}
