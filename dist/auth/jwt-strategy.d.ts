import { ConfigService } from '@nestjs/config';
declare const JwtAuthStrategy_base: new (...args: any) => any;
export declare class JwtAuthStrategy extends JwtAuthStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
    }>;
}
export {};
