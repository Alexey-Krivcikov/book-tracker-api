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

  async login(user: { id: string; email: string }) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: "60m",
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "7d",
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
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

  async refresh(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);

    const accessToken = this.jwtService.sign(
      {
        sub: payload.sub,
        email: payload.email,
      },
      {
        expiresIn: "60m",
      },
    );

    return {
      accessToken,
    };
  }

  async logout(res: Response) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.json({ message: "Logged out successfully" });
  }
}
