import { BadRequestException, Injectable } from "@nestjs/common";
import { AddUserBookDto } from "./dto/add-user-book.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserBooksService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.userBook.findMany({
      where: { userId },
      include: {
        book: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async add(data: AddUserBookDto) {
    const { externalId, title, authors, cover, status, rating, userId } = data;

    return this.prisma.$transaction(async (tx) => {
      let book = await tx.book.findUnique({
        where: { externalId },
      });

      if (!book) {
        book = await tx.book.create({
          data: {
            externalId,
            title,
            authors,
            cover,
          },
        });
      }

      const existing = await tx.userBook.findUnique({
        where: {
          userId_bookId: {
            userId,
            bookId: book.id,
          },
        },
      });

      if (existing) {
        throw new BadRequestException("Book already added");
      }

      return tx.userBook.create({
        data: {
          userId,
          bookId: book.id,
          status,
          rating,
        },
        include: {
          book: true,
        },
      });
    });
  }
}
