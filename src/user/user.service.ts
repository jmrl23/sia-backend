import { Injectable } from '@nestjs/common';
import { User } from 'src/common/types/user';

@Injectable()
export class UserService {
  getSession(user: User) {
    return user ?? null;
  }
}
