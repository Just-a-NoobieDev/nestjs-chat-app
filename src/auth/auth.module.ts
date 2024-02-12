import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Services } from 'src/utils/constants';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './utils/localStrategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({ secret: 'SECRET', signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
