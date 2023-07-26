import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    addToClickedProducts(req: any, productId: number): Promise<{
        user: User;
    }>;
}
