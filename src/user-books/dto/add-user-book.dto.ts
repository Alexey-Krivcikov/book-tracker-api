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

export class AddUserBookDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  externalId?: string;

  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @IsOptional()
  @IsString()
  cover?: string;

  @IsEnum(UserBookStatus)
  status: UserBookStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
