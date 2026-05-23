import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  HttpCode,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { RefreshDto } from "./dto/refresh.dto";
import type { Response } from "express";

import {
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Login user" })
  @ApiOkResponse({ description: "User successfully logged in" })
  @ApiUnauthorizedResponse({ description: "Invalid credentials" })
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  @ApiOkResponse({ description: "User successfully registered" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Logout user" })
  @ApiOkResponse({ description: "User successfully logged out" })
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh access token" })
  @ApiOkResponse({ description: "Access token refreshed" })
  @ApiUnauthorizedResponse({ description: "Invalid refresh token" })
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }
}
