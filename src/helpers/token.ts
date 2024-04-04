import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from 'src/auth/dto/createTokenDto';
import { TokenType } from 'src/types/token';

export const createToken = (
  createTokenDto: CreateTokenDto,
  jwtService: JwtService,
) => {
  const tokens = {
    accessToken: jwtService.sign({ ...createTokenDto, type: TokenType.access }),
    refreshToken: jwtService.sign(
      { ...createTokenDto, type: TokenType.refresh },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY || 'secret',
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '5h',
      },
    ),
  };
  return tokens;
};
