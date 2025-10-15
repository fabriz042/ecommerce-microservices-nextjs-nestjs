import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma';
import { RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { envs } from 'src/config';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('____________Auth connected to the database');
  }

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      await this.user.create({
        data: {
          email: registerUserDto.email,
          name: registerUserDto.name,
          password: await bcrypt.hash(registerUserDto.password, 10),
        },
      });
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: 'Error registering user',
      });
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const user = await this.user.findUnique({
        where: { email: loginUserDto.email },
      });
      if (!user) {
        throw new RpcException({
          status: 400,
          message: 'User or password incorrect',
        });
      }
      const isPasswordValid = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new RpcException({
          status: 400,
          message: 'User or password incorrect',
        });
      }

      return {
        token: await this.signJWT({
          id: user.id,
          email: user.email,
          name: user.name,
        }),
      };
    } catch (error) {
      throw new RpcException({
        status: 500,
        message: 'Error logging in user',
      });
    }
  }

  async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });
      return {
        user: user,
        token: await this.signJWT(user),
      };
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: 401,
        message: 'Invalid token',
      });
    }
  }
}
