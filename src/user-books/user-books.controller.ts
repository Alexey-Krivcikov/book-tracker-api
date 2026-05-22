import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserBooksService } from "./user-books.service";
import { AddUserBookDto } from "./dto/add-user-book.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateUserBookDto } from "./dto/update-user-book.dto";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@Controller("user-books")
@UseGuards(JwtAuthGuard)
export class UserBooksController {
  constructor(private readonly userBooksService: UserBooksService) {}

  @Get()
  findAll(@CurrentUser("userId") userId: string) {
    return this.userBooksService.findAll(userId);
  }

  @Post()
  add(@Body() dto: AddUserBookDto, @CurrentUser("userId") userId: string) {
    return this.userBooksService.add(userId, dto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateUserBookDto,
    @CurrentUser("userId") userId: string,
  ) {
    return this.userBooksService.update(id, userId, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @CurrentUser("userId") userId: string) {
    return this.userBooksService.remove(userId, id);
  }
}
