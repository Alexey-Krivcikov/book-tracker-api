import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "user@mail.com",
    description: "User email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "password123",
    description: "User password (min 6 chars)",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
