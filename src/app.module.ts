import { Module } from '@nestjs/common';
import { EnvironmentModule } from './settings/environment/env.module';
import { DatabaseModule } from './settings/database/database.mysql';
import { PostModule } from './post/post.module';

@Module({
  imports: [EnvironmentModule, DatabaseModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
