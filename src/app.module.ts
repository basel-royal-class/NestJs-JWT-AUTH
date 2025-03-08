import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth-module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { B2BDashboardController } from './modules/b2b/dashboard-controller';
import { FavoritesController } from './modules/b2c/favorites-controller';
import { FormsController } from './modules/common/forms-controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/first_db', {
      autoCreate: true, // Automatically create collections
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule], // Optional if using .env variables
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Use environment variable for secret key
        signOptions: { expiresIn: '60m' }, // Set token expiry (optional)
      }),
    }),

    AuthModule,
    UsersModule
    // Replace with your MongoDB URI
  ],
  controllers: [AppController,
    UsersController,
    B2BDashboardController,
    FavoritesController,
    FormsController,
  ],
  providers: [
    AppService,
    UsersService,
  ],
})

export class AppModule { }

