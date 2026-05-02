import { Injectable } from '@nestjs/common';
import { AddUserBookDto } from "./dto/add-user-book.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserBooksService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.userBook.findMany();
  }

  add(data: AddUserBookDto) {
    return this.prisma.userBook.create({
      data,
    });
  }
}
