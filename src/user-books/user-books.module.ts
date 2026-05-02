import { Module } from '@nestjs/common';
import { UserBooksController } from './user-books.controller';
import { UserBooksService } from './user-books.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UserBooksController],
  providers: [UserBooksService]
})
export class UserBooksModule {}
