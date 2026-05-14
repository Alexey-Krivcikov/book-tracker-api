import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { AddUserBookDto } from "./dto/add-user-book.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserBookDto } from "./dto/update-user-book.dto";

@Injectable()
export class UserBooksService {
  private readonly logger = new Logger(UserBooksService.name);

  constructor(private prisma: PrismaService) {}

  findAll(userId: string) {
    this.logger.log(`Finding all books for user: ${userId}`);

    return this.prisma.userBook.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async add(userId: string, dto: AddUserBookDto) {
    this.logger.log(`Adding book for user: ${userId}`);
    this.logger.debug(`Book data: ${JSON.stringify(dto)}`);

    const { externalId, title, authors, description, cover, status, rating } =
      dto;

    if (!externalId) {
      this.logger.warn(
        `Add book failed - missing externalId for user: ${userId}`,
      );
      throw new BadRequestException("externalId обязателен");
    }

    const existing = await this.prisma.userBook.findFirst({
      where: {
        userId,
        externalId,
      },
    });

    if (existing) {
      this.logger.warn(
        `Add book failed - book already exists for user: ${userId}, externalId: ${externalId}, title: ${title}`,
      );
      throw new BadRequestException("Книга уже добавлена");
    }

    this.logger.log(
      `Creating book: ${title} (externalId: ${externalId}) for user: ${userId}`,
    );

    const book = await this.prisma.userBook.create({
      data: {
        userId,
        externalId,
        title,
        authors,
        description,
        cover,
        status,
        rating,
      },
    });

    this.logger.log(
      `Book created successfully: ${book.id} - ${title} for user: ${userId}`,
    );

    return book;
  }

  async update(id: string, userId: string, dto: UpdateUserBookDto) {
    this.logger.log(`Updating book ${id} for user: ${userId}`);
    this.logger.debug(`Update data: ${JSON.stringify(dto)}`);

    const book = await this.prisma.userBook.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!book) {
      this.logger.warn(
        `Update failed - book not found: ${id} for user: ${userId}`,
      );
      throw new NotFoundException("Книга не найдена");
    }

    this.logger.log(`Book found: ${book.id} - ${book.title}`);

    const updatedBook = await this.prisma.userBook.update({
      where: { id },
      data: dto,
    });

    this.logger.log(
      `Book updated successfully: ${updatedBook.id} - ${updatedBook.title}`,
    );

    return updatedBook;
  }

  async remove(userId: string, id: string) {
    this.logger.log(`Removing book ${id} for user: ${userId}`);

    const result = await this.prisma.userBook.deleteMany({
      where: {
        id,
        userId,
      },
    });

    if (result.count === 0) {
      this.logger.warn(
        `Remove failed - book not found: ${id} for user: ${userId}`,
      );
      throw new NotFoundException("Книга не найдена");
    }

    this.logger.log(
      `Book removed successfully: ${id} for user: ${userId}, deleted count: ${result.count}`,
    );

    return result;
  }
}
