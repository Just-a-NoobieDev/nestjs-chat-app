import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/helpers';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.userRepository.findOneBy({
      email: userDetails.email,
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const password = await hashPassword(userDetails.password);
    const user = this.userRepository.create({
      ...userDetails,
      password,
    });
    return this.userRepository.save(user);
  }

  async findUser(findUserParams: FindUserParams): Promise<User> {
    return this.userRepository.findOneBy(findUserParams);
  }
}
