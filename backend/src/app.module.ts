import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "Post1234",
      "database": "ecommerce_db",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }
    ),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your_secret_key_here',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
  ],
  controllers: [UserController], 
  providers: [UserService],
})
export class AppModule {}
