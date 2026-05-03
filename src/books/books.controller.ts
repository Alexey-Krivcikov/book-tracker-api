import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { BooksService } from "./books.service";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("books")
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get("search")
  search(@Query("q") query: string) {
    if (!query) {
      return [];
    }

    return this.booksService.search(query);
  }
}
