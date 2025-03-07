import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/auth/auth-conroller';
import { AuthService } from 'src/auth/auth-service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth-module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [
    MongooseModule,  // Export MongooseModule so it can be used in other modules
  ],
})
export class UsersModule { }
