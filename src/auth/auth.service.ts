import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { Services } from 'src/utils/constants';
import { ValidateUserDetails } from 'src/utils/types';
import { IUserService } from 'src/users/user';
import { compareHash } from 'src/utils/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.userService.findUser({ email: userDetails.email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (compareHash(userDetails.password, user.password)) {
      const payload = { username: userDetails.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
