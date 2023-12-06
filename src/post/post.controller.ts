import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { SuggestPostDto } from './dto/suggest-post.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePost } from './interface/createPost.interface';
import { SuggestPost } from './interface/suggestPost.interface';

@Controller('api/v1/embeddings')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @ApiOperation({ summary: 'Create post' })
  @Post('/create')
  async createPost(@Body() CreatePost: CreatePostDto): Promise<CreatePost> {
    return await this.postService.createPost(CreatePost);
  }

  @ApiOperation({ summary: 'Suggestion post' })
  @Post('/suggestion')
  async suggestionPost(@Body() suggestPost: SuggestPostDto): Promise<SuggestPost> {
    return await this.postService.suggestPost(suggestPost);
  }
}
