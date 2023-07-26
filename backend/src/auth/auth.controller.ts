import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../user/user.entity'; // Import the User entity

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<{ accessToken: string; user: User }> {
    const { accessToken, user } = await this.authService.login(req.user);
    return { accessToken, user };
  }

  @Post('signup')
  async signup(@Request() req): Promise<{ accessToken: string | null; user?: User }> {
    const { email, name, password } = req.body;
    const user = await this.authService.signup(email, name, password);

    if (!user) {
      return { accessToken: null };
    }

    const {accessToken} = await this.authService.login(user);
    return { accessToken, user };
  }
}
