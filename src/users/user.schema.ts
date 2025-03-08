// user.entity.ts
import { Controller } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // This will store the hashed password

  @Prop({ required: true, enum: ['b2c', 'b2b'] })
  userType: string; // Differentiates B2C and B2B users

}

export const UserSchema = SchemaFactory.createForClass(User);
