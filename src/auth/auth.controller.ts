import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dto/CreateUser.dto';
import { IUserService } from 'src/users/user';
import { instanceToPlain } from 'class-transformer';
import { LocalAuthGuard } from './utils/Guard';
import { ValidateUserDetails } from 'src/utils/types';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() validateUserDetails: ValidateUserDetails) {
    return this.authService.validateUser(validateUserDetails);
  }

  @Post('logout')
  logout() {}

  @Get('status')
  status() {}
}
