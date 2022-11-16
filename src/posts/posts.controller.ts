import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 创建文章
   * @param post 文章
   */
  @ApiOperation({ summary: '创建文章' })
  @Post()
  async create(@Body() post) {
    return await this.postsService.create(post);
  }

  /**
   * 批量查找
   * @param query 查找条件
   */
  @Get()
  async findAll(@Query() query) {
    return await this.postsService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id 文章id
   */
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id);
  }

  /**
   * 更新文章
   * @param id 文章id
   * @param post 文章内容
   */
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   * 删除文章
   * @param id 文章id
   */
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.postsService.deletePost(id);
  }
}
