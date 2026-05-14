import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { BooksService } from "./books.service";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("books")
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get("search")
  async search(@Query("q") query: string, @Request() req) {
    const userId = req.user.userId;
    return this.booksService.search(query, userId);
  }
}
