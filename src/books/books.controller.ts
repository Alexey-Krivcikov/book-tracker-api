import { Controller, Get, Query } from "@nestjs/common";
import { BooksService } from "./books.service";

@Controller("books")
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
