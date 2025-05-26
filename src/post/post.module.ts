import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { User } from "../users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./entities/post.entity";
import { UsersService } from "../users/users.service";
import { UsersResolver } from "../users/users.resolver";
import { PostResolver } from "./post.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts])],
  controllers: [PostController],
  providers: [PostService, UsersService, UsersResolver, PostResolver],
})
export class PostModule {}
