"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../users/user.schema");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    userModel;
    jwtService;
    configService;
    constructor(userModel, jwtService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async comparePasswords(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    async register(createUserDto) {
        const { password, email, userType, ...userData } = createUserDto;
        if (userType !== 'b2c' && userType !== 'b2b') {
            throw new Error('Invalid user type');
        }
        const existingUser = await this.userModel.findOne({ email, userType });
        if (existingUser) {
            throw new Error(`A ${userType.toUpperCase()} user with this email already exists`);
        }
        const hashedPassword = await this.hashPassword(password);
        const newUser = new this.userModel({
            ...userData,
            email,
            password: hashedPassword,
            userType,
        });
        return await newUser.save();
    }
    async login(loginDto) {
        const { email, password, userType } = loginDto;
        const user = await this.userModel.findOne({ email, userType });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials or user type');
        }
        const isPasswordValid = await this.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user._id, userType };
        const secret = user.userType === 'b2b'
            ? this.configService.get('B2B_JWT_SECRET')
            : this.configService.get('B2C_JWT_SECRET');
        const accessToken = this.jwtService.sign(payload, { secret });
        return {
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                userType: user.userType,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth-service.js.map