import { UserBookStatus } from "../types/user-book.type";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserBookDto {
  @ApiPropertyOptional({
    enum: UserBookStatus,
    example: UserBookStatus.READING,
    description: "Updated reading status",
  })
  @IsOptional()
  @IsEnum(UserBookStatus)
  status?: UserBookStatus;

  @ApiPropertyOptional({
    example: 4,
    description: "Updated book rating from 1 to 10",
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
