import { BadGatewayException, Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async search(query: string, userId: string) {
    const startTime = Date.now();
    this.logger.log(`Searching books for user: ${userId}, query: "${query}"`);

    try {
      // TODO: вынести ключ
      const url = `https://www.googleapis.com/books/v1/volumes?maxResults=10&langRestrict=ru&q=${encodeURIComponent(query)}&key=AIzaSyANpGowrTgu2N5mKGW0ZbrqOR8ptmabar8`;

      this.logger.debug(`Google Books API URL: ${url}`);

      const response = await firstValueFrom(this.httpService.get(url));

      const totalItems = response.data.totalItems || 0;
      this.logger.log(
        `Google Books API returned ${totalItems} items for query: "${query}"`,
      );

      if (totalItems === 0) {
        this.logger.warn(`No books found for query: "${query}"`);
        return [];
      }

      const userBooks = await this.prisma.userBook.findMany({
        where: { userId },
        select: { externalId: true },
      });

      const userBookIds = new Set(
        userBooks.map((book) => book.externalId).filter((id) => id !== null),
      );

      this.logger.debug(`User has ${userBookIds.size} books in library`);

      const mappedBooks = this.mapBooks(response.data.items || [], userBookIds);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Search completed in ${duration}ms, returned ${mappedBooks.length} books`,
      );

      return mappedBooks;
    } catch (e) {
      const duration = Date.now() - startTime;
      this.logger.error(
        `Google Books API error after ${duration}ms: ${e.message}`,
      );

      if (e.response) {
        this.logger.error(`API Response status: ${e.response.status}`);
        this.logger.error(
          `API Response data: ${JSON.stringify(e.response.data)}`,
        );
      }

      throw new BadGatewayException("Google Books API error");
    }
  }

  private mapBooks(items: any[], userBookIds: Set<string>) {
    this.logger.debug(`Mapping ${items.length} books from Google API`);

    const mappedBooks = items.map((item) => {
      const volume = item.volumeInfo;

      const book = {
        externalId: item.id,
        title: volume.title,
        authors: volume.authors || [],
        description: volume.description || null,
        cover: volume.imageLinks?.thumbnail || null,
        publishedDate: volume.publishedDate || null,
        isAdded: userBookIds.has(item.id),
      };

      if (book.isAdded) {
        this.logger.debug(
          `Book already in library: ${book.title} (${book.externalId})`,
        );
      }

      return book;
    });

    const addedCount = mappedBooks.filter((book) => book.isAdded).length;
    this.logger.debug(
      `Mapped ${mappedBooks.length} books, ${addedCount} already in library`,
    );

    return mappedBooks;
  }
}
