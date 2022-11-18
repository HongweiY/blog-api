import { Injectable } from '@nestjs/common';
import { ColumnsEntity } from './columns.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export interface ColumnsRo {
  count: number;
  list: ColumnsEntity[];
}
@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnsEntity)
    private readonly columnsRepository: Repository<ColumnsEntity>,
  ) {}

  async findAll(query): Promise<ColumnsRo> {
    const count = await this.columnsRepository.count();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    const list = await this.columnsRepository.find({
      skip: pageNum - 1,
      take: pageSize,
    });
    return { list, count };
  }

  async findById(query): Promise<ColumnsEntity> {
    const { cId } = query;
    return await this.columnsRepository.findOneBy({ id: cId });
  }
}
