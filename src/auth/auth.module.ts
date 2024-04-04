import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY || 'secret',
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '15m',
      },
    }),
  ],
})
export class AuthModule {}
