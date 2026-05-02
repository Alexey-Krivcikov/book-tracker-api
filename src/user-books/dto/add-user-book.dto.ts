import { UserBookStatus } from "../types/user-book.type";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class AddUserBookDto {
  @IsString()
  userId: string;

  @IsString()
  bookId: string;

  @IsEnum(UserBookStatus)
  status: UserBookStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;
}
