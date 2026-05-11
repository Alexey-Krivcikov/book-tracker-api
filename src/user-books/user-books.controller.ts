import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UserBooksService } from "./user-books.service";
import { AddUserBookDto } from "./dto/add-user-book.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateUserBookDto } from "./dto/update-user-book.dto";

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

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateUserBookDto,
    @Request() req,
  ) {
    return this.userBooksService.update(id, req.user.userId, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Request() req) {
    const userId = req.user.userId;
    console.log(userId, "userId");
    console.log(id, "id");
    return this.userBooksService.remove(userId, id);
  }
}
