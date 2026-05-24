import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserBookStatus } from "../types/user-book.type";

export class UserBookResponseDto {
  @ApiProperty({
    example: "c45c54af-dab8-4d1e-a3d0-7d6c50a12345",
  })
  id: string;

  @ApiProperty({
    example: "Harry Potter and the Philosopher's Stone",
  })
  title: string;

  @ApiProperty({
    example: "M6rFDQAAQBAJ",
  })
  externalId: string;

  @ApiProperty({
    type: [String],
    example: ["J.K. Rowling"],
  })
  authors: string[];

  @ApiPropertyOptional({
    example: "A fantasy novel about a young wizard",
  })
  description?: string;

  @ApiPropertyOptional({
    example: "https://books.google.com/book-cover.jpg",
  })
  cover?: string;

  @ApiProperty({
    enum: UserBookStatus,
    example: UserBookStatus.READING,
  })
  status: UserBookStatus;

  @ApiPropertyOptional({
    example: 8,
  })
  rating?: number;

  @ApiProperty({
    example: "2026-05-16T12:30:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    example: "2026-05-16T14:22:00.000Z",
  })
  updatedAt: Date;
}
