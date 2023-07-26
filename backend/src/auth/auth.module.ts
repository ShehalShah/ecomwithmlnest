import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.strategy'; 
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your_secret_key_here', // Replace with your JWT secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}
