import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | undefined>;
    createUser(email: string, name: string, password: string): Promise<User>;
}
