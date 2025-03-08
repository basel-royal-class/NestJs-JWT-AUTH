import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.schema';
import { CreateUserDto, LoginDto } from 'src/dto/create-user-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    // Hash password before saving user
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    // Compare passwords
    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    // Register B2C or B2B user
    async register(createUserDto: CreateUserDto): Promise<User> {
        const { password, email, userType, ...userData } = createUserDto;

        // Ensure valid user type
        if (userType !== 'b2c' && userType !== 'b2b') {
            throw new Error('Invalid user type');
        }

        // Check if email is already registered
        const existingUser = await this.userModel.findOne({ email, userType });
        if (existingUser) {
            throw new Error(`A ${userType.toUpperCase()} user with this email already exists`);
        }

        const hashedPassword = await this.hashPassword(password);
        const newUser = new this.userModel({
            ...userData,
            email,
            password: hashedPassword,
            userType, // Save user type
        });

        return await newUser.save();
    }

    // Login B2C or B2B user
    async login(loginDto: LoginDto) {
        const { email, password, userType } = loginDto;

        // Find user by email and userType
        const user = await this.userModel.findOne({ email, userType });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials or user type');
        }

        const isPasswordValid = await this.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token with user type
        const payload = { email: user.email, sub: user._id, userType };
        // Use correct secret
        const secret = user.userType === 'b2b'
            ? this.configService.get<string>('B2B_JWT_SECRET')
            : this.configService.get<string>('B2C_JWT_SECRET');


        const accessToken = this.jwtService.sign(payload, { secret });

        return {
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                userType: user.userType, // Include user type in response
            },
        };
    }
}
