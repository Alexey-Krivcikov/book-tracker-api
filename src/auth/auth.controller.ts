import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  HttpCode,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import type { Response, Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return this.authService.login(user, res);
  }

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException("No refresh token provided");
    }

    const tokens = await this.authService.refreshToken(refreshToken);

    res.cookie("access_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.json({
      message: "Token refreshed successfully",
      expiresIn: 3600,
    });
  }
}
