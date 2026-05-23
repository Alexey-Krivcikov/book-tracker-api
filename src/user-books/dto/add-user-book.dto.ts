import { UserBookStatus } from "../types/user-book.type";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AddUserBookDto {
  @ApiProperty({
    example: "Harry Potter and the Philosopher's Stone",
    description: "Book title",
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: "M6rFDQAAQBAJ",
    description: "External provider ID (Google Books etc.)",
  })
  @IsOptional()
  @IsString()
  externalId?: string;

  @ApiProperty({
    example: ["J.K. Rowling"],
    description: "Book authors",
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @ApiPropertyOptional({
    example: "https://books.google.com/cover.jpg",
    description: "Book cover URL",
  })
  @IsOptional()
  @IsString()
  cover?: string;

  @ApiProperty({
    enum: UserBookStatus,
    example: UserBookStatus.PLANNED,
    description: "Current reading status",
  })
  @IsEnum(UserBookStatus)
  status: UserBookStatus;

  @ApiPropertyOptional({
    example: 8,
    description: "Book rating from 1 to 10",
    minimum: 1,
    maximum: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;

  @ApiPropertyOptional({
    example: "A fantasy novel about a young wizard.",
    description: "Book description",
  })
  @IsOptional()
  @IsString()
  description?: string;
}
