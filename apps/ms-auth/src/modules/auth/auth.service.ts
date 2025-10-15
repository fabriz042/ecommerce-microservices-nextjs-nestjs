import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  registerUser() {
    return 'This action returns register user';
  }

  loginUser() {
    return `This action returns login user`;
  }

  verifyToken() {
    return `This action returns a verified user`;
  }
}
