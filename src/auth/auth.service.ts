import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { id: string; email: string }, res: Response) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload, { expiresIn: "60m" });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: "7d" });

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/auth/refresh",
    });

    return res.json({ message: "Logged in successfully" });
  }

  async register(dto: RegisterDto) {
    const { email, password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign(
        { email: payload.email, sub: payload.sub },
        { expiresIn: "60m" },
      );
      return { access_token: newAccessToken };
    } catch {
      throw new Error("Invalid refresh token");
    }
  }

  async logout(res: Response) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.json({ message: "Logged out successfully" });
  }
}
