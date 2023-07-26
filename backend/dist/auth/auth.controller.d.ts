import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        accessToken: string;
        user: User;
    }>;
    signup(req: any): Promise<{
        accessToken: string | null;
        user?: User;
    }>;
}
