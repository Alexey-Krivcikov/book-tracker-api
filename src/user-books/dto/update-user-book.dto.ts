import { UserBookStatus } from "../types/user-book.type";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

export class UpdateUserBookDto {
  @IsOptional()
  @IsEnum(UserBookStatus)
  status?: UserBookStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;
}
