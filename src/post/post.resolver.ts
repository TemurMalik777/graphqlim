import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { UsersResolver } from "../users/users.resolver";
import { Args, Mutation } from "@nestjs/graphql";
import { Posts } from "./entities/post.entity";

@Controller("post")
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userResolver: UsersResolver
  ) {}

  @Mutation(() => Posts)
  async createPost(
    @Args("createPost") createPostDto: CreatePostDto,
    @Args("authorId") authorId: number
  ) {
    const author = await this.userResolver.findOneUser(+authorId);
    return this.postService.create(createPostDto, author!);
  }

  @Mutation(() => [Posts])
  findAllPosts() {
    return this.postService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postService.remove(+id);
  }
}
