import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.schema';
import { CreateUserDto, LoginDto } from 'src/dto/create-user-dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    // Hash password before saving user
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    // Compare passwords
    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    // User registration (Sign-up)
    async register(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...userData } = createUserDto;
        const hashedPassword = await this.hashPassword(password);
        const newUser = new this.userModel({
            ...userData,
            password: hashedPassword,
        });
        return await newUser.save();
    }

    // User login (Sign-in)
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await this.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const payload = { email: user.email, sub: user._id };
        const accessToken = this.jwtService.sign(payload);  // Generate JWT

        return {
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            },
        }; // Return the generated token
    }
}
