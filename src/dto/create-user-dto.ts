export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  userType: 'b2c' | 'b2b';
}

export class LoginDto {
  readonly email: string;
  readonly password: string;
  userType: 'b2c' | 'b2b';
}
