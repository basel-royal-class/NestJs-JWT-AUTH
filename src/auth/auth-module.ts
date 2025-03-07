import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth-service';
import { JwtAuthStrategy } from './jwt-strategy'; // Ensure strategy is imported
import { User, UserSchema } from 'src/users/user.schema';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth-conroller';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }), // Register passport strategy
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60m' },
            }),
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Ensure UserModel is registered
    ],
    providers: [AuthService, JwtAuthStrategy], // Ensure JwtAuthStrategy is provided
    controllers: [AuthController],
    exports: [AuthService], // Export AuthService for other modules
})
export class AuthModule { }
