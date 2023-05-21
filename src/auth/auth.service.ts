import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(): string {
    throw new Error('Method not implemented.');
  }
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
}