import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  registerUser() {
    return this.authService.registerUser();
  }

  @MessagePattern('auth.login.user')
  loginUser() {
    return this.authService.loginUser();
  }

  @MessagePattern('auth.verify.user')
  verifyToken() {
    return this.authService.verifyToken();
  }
}
