import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserBooksService } from "./user-books.service";
import { AddUserBookDto } from "./dto/add-user-book.dto";

@Controller("user-books")
export class UserBooksController {
  constructor(private readonly userBooksService: UserBooksService) {}

  @Get()
  findAll() {
    return this.userBooksService.findAll();
  }

  @Post()
  add(@Body() dto: AddUserBookDto) {
    return this.userBooksService.add(dto);
  }
}
