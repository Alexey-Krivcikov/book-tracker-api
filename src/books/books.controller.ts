import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { BooksService } from "./books.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { BookSearchResponseDto } from "./dto/search.dto";

@ApiTags("books")
@ApiBearerAuth("access-token")
@Controller("books")
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get("search")
  @ApiOperation({
    summary: "Search books",
    description: "Search books by query string and mark already added ones",
  })
  @ApiQuery({
    name: "q",
    required: true,
    example: "Harry Potter",
    description: "Search query",
  })
  @ApiResponse({
    type: BookSearchResponseDto,
    status: 200,
    description: "List of books returned successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid query parameter",
  })
  async search(
    @Query("q") query: string,
    @CurrentUser("userId") userId: string,
  ) {
    return this.booksService.search(query, userId);
  }
}
