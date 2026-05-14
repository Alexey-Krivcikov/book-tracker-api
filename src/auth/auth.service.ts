import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { Response } from "express";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    this.logger.log(`Validating user: ${email}`);

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      this.logger.warn(`Validation failed - user not found: ${email}`);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      this.logger.warn(`Validation failed - invalid password for: ${email}`);
      return null;
    }

    this.logger.log(`User validated successfully: ${email}`);

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: { id: string; email: string }) {
    this.logger.log(`Login attempt for user: ${user.email} (${user.id})`);

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

    this.logger.log(`User logged in successfully: ${user.email} (${user.id})`);
    this.logger.debug(
      `Tokens generated - Access: ${accessToken.substring(0, 20)}..., Refresh: ${refreshToken.substring(0, 20)}...`,
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async register(dto: RegisterDto) {
    this.logger.log(`Register attempt: ${dto.email}`);

    const { email, password } = dto;

    const existing = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      this.logger.warn(`Register failed - user exists: ${email}`);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    this.logger.log(`User registered successfully: ${user.email} (${user.id})`);

    return user;
  }

  async refresh(refreshToken: string) {
    this.logger.log(`Refresh token attempt`);

    try {
      const payload = this.jwtService.verify(refreshToken);
      this.logger.log(
        `Refresh token verified for user: ${payload.email} (${payload.sub})`,
      );

      const accessToken = this.jwtService.sign(
        {
          sub: payload.sub,
          email: payload.email,
        },
        {
          expiresIn: "60m",
        },
      );

      this.logger.debug(
        `New access token generated: ${accessToken.substring(0, 20)}...`,
      );

      return {
        accessToken,
      };
    } catch (error) {
      this.logger.error(`Refresh token failed: ${error.message}`);
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async logout(res: Response) {
    this.logger.log(`Logout attempt`);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    this.logger.log(`User logged out successfully - cookies cleared`);

    return res.json({ message: "Logged out successfully" });
  }
}
