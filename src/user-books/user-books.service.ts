import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AddUserBookDto } from "./dto/add-user-book.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserBookDto } from "./dto/update-user-book.dto";

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

  async update(id: string, userId: string, dto: UpdateUserBookDto) {
    const book = await this.prisma.userBook.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!book) {
      throw new NotFoundException("Книга не найдена");
    }

    return this.prisma.userBook.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    return this.prisma.userBook.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
