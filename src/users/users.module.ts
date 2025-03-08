import { Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [
    MongooseModule,  // Export MongooseModule so it can be used in other modules
  ],
})
export class UsersModule { }
