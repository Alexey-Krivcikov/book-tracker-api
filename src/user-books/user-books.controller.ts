import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UserBooksService } from "./user-books.service";
import { AddUserBookDto } from "./dto/add-user-book.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("user-books")
@UseGuards(JwtAuthGuard)
export class UserBooksController {
  constructor(private readonly userBooksService: UserBooksService) {}

  @Get()
  findAll(@Request() req) {
    const userId = req.user.userId;
    return this.userBooksService.findAll(userId);
  }

  @Post()
  add(@Body() dto: AddUserBookDto, @Request() req) {
    const userId = req.user.userId;
    return this.userBooksService.add(userId, dto);
  }
}
