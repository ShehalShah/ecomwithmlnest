import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User | null>;
    signup(email: string, name: string, password: string): Promise<User>;
    login(user: User): Promise<{
        accessToken: string;
        user: User;
    }>;
    validateUserById(userId: number): Promise<User | null>;
}
