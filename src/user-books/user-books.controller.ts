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

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserBookResponseDto } from "./dto/user-book-response.dto";

@ApiTags("user-books")
@ApiBearerAuth("access-token")
@Controller("user-books")
@UseGuards(JwtAuthGuard)
export class UserBooksController {
  constructor(private readonly userBooksService: UserBooksService) {}

  @Get()
  @ApiOperation({
    summary: "Get all books from user's library",
  })
  @ApiResponse({
    status: 200,
    type: UserBookResponseDto,
    isArray: true,
    description: "Books successfully loaded",
  })
  findAll(@CurrentUser("userId") userId: string) {
    return this.userBooksService.findAll(userId);
  }

  @Post()
  @ApiOperation({
    summary: "Add a book to library",
  })
  @ApiResponse({
    status: 201,
    description: "Book successfully added",
  })
  @ApiResponse({
    status: 409,
    description: "Book already exists",
  })
  add(@Body() dto: AddUserBookDto, @CurrentUser("userId") userId: string) {
    return this.userBooksService.add(userId, dto);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update book status or rating",
  })
  @ApiParam({
    name: "id",
    example: "c45c54af-dab8-4d1e-a3d0-7d6c50a12345",
  })
  @ApiResponse({
    status: 200,
    description: "Book successfully updated",
  })
  @ApiResponse({
    status: 404,
    description: "Book not found",
  })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateUserBookDto,
    @CurrentUser("userId") userId: string,
  ) {
    return this.userBooksService.update(id, userId, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a book from library",
  })
  @ApiParam({
    name: "id",
    example: "c45c54af-dab8-4d1e-a3d0-7d6c50a12345",
  })
  @ApiResponse({
    status: 200,
    description: "Book successfully deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Book not found",
  })
  remove(@Param("id") id: string, @CurrentUser("userId") userId: string) {
    return this.userBooksService.remove(userId, id);
  }
}
