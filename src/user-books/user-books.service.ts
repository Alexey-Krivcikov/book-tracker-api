import { BadRequestException, Injectable } from "@nestjs/common";
import { AddUserBookDto } from "./dto/add-user-book.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserBooksService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.userBook.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async add(userId: string, dto: AddUserBookDto) {
    const { title } = dto;

    const existing = await this.prisma.userBook.findUnique({
      where: {
        userId_title: {
          userId,
          title,
        },
      },
    });

    if (existing) {
      throw new BadRequestException("Книга уже добавлена");
    }

    return this.prisma.userBook.create({
      data: {
        userId,
        ...dto,
      },
    });
  }
}
