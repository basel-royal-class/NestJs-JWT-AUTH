import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly userType: 'b2c' | 'b2b') {
        super();
    }

    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw new UnauthorizedException();
        }

        if (user.userType !== this.userType) {
            throw new UnauthorizedException(`Access denied for ${user.userType} users`);
        }

        return user;
    }
}
