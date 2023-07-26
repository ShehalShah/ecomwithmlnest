import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard()) 
  @Post('clickedproducts')
  async addToClickedProducts(@Request() req, @Body('productId') productId: number): Promise<{ user: User }> {
    const user = req.user as User; 
    const updatedUser = await this.userService.addToClickedProducts(
        user.id,
        productId,
      );
  
      return { user: updatedUser };
  }
}
