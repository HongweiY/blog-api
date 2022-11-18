import { Controller, Get, Param, Query } from '@nestjs/common';
import { ColumnsRo, ColumnsService } from './columns.service';
import { PostRo, PostsService } from '../posts/posts.service';
import { ColumnsEntity } from './columns.entity';

@Controller('columns')
export class ColumnsController {
  constructor(
    private readonly columnsService: ColumnsService,
    private readonly postService: PostsService,
  ) {}

  @Get()
  async findAll(@Query() query): Promise<ColumnsRo> {
    return await this.columnsService.findAll(query);
  }

  @Get(':id')
  async findColumn(@Param('id') id): Promise<ColumnsEntity> {
    return await this.columnsService.findById(id);
  }

  @Get(':id/posts')
  async findPostByColumnId(@Query() query): Promise<PostRo> {
    return await this.postService.findPostByCid(query);
  }
}
