import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload, TokenType } from 'src/types/token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getToken(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = (await this.jwtService.verify(token)) as Payload;

      if (payload.type === TokenType.refresh) throw new UnauthorizedException();

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  getToken(request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
