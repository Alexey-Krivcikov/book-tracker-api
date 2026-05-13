import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserBooksModule } from "./user-books/user-books.module";
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [UserBooksModule, BooksModule, AuthModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
