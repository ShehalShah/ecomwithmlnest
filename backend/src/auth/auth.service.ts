import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async signup(email: string, name: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the user module
    const newUser = await this.userService.createUser(email, name, hashedPassword);

    // Return the entire user object
    return newUser;
  }

  async login(user: User): Promise<{ accessToken: string; user: User }> {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    // Return the entire user object along with the access token
    return { accessToken, user };
  }
}
