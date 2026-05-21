import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { BooksService } from "./books.service";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from "../common/decorators/current-user.decorator";

@Controller("books")
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get("search")
  async search(
    @Query("q") query: string,
    @CurrentUser("userId") userId: string,
  ) {
    return this.booksService.search(query, userId);
  }
}
