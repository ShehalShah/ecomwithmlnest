import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    addToClickedProducts(req: any, productId: number): Promise<{
        user: User;
    }>;
    addToWatchlist(req: any, productId: number): Promise<{
        user: User;
    }>;
    removeFromWatchlist(req: any, productId: number): Promise<{
        user: User;
    }>;
}
