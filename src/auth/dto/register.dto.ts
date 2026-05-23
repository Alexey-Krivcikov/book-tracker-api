import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "user@mail.com",
    description: "User email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "password123",
    description: "User password (min 6 characters)",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
