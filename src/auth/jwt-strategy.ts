import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider: (request, rawJwtToken, done) => {
                try {
                    // Decode token to get userType without verifying
                    const decoded: any = JSON.parse(Buffer.from(rawJwtToken.split('.')[1], 'base64').toString());

                    // Use the appropriate secret based on userType
                    const secret = decoded.userType === 'b2b'
                        ? configService.get<string>('B2B_JWT_SECRET')
                        : configService.get<string>('B2C_JWT_SECRET');

                    done(null, secret);
                } catch (error) {
                    done(new UnauthorizedException('Invalid token'), null);
                }
            },
        });
    }

    async validate(payload: any) {
        if (!payload.userType) {
            throw new UnauthorizedException('Invalid token: missing user type');
        }

        return {
            userId: payload.sub,
            email: payload.email,
            userType: payload.userType
        };
    }
}
