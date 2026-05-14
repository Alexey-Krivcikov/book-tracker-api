import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { HttpModule } from "@nestjs/axios";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
