import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class BookSearchResponseDto {
  @ApiProperty({
    example: "M6rFDQAAQBAJ",
    description: "External book ID",
  })
  externalId: string;

  @ApiProperty({
    example: "Harry Potter and the Philosopher's Stone",
    description: "Book title",
  })
  title: string;

  @ApiProperty({
    type: [String],
    example: ["J.K. Rowling"],
    description: "Book authors",
  })
  authors: string[];

  @ApiPropertyOptional({
    example: "A fantasy novel about a young wizard",
    description: "Book description",
  })
  description?: string;

  @ApiPropertyOptional({
    example: "https://books.google.com/cover.jpg",
    description: "Book cover image URL",
  })
  cover?: string;

  @ApiPropertyOptional({
    example: "1997-06-26",
    description: "Book publication date",
  })
  publishedDate?: string;

  @ApiProperty({
    example: false,
    description: "Whether the book is already in user's library",
  })
  isAdded: boolean;
}
