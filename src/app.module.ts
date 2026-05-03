import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserBooksModule } from "./user-books/user-books.module";
import { BooksModule } from './books/books.module';

@Module({
  imports: [UserBooksModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
