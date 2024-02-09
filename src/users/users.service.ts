import { Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { CreateUserDetails } from 'src/utils/types';

@Injectable()
export class UsersService implements IUserService {
  createUser(userDetails: CreateUserDetails) {
    console.log('User created successfully!');
  }
}
