import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(email: string, name: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    user.watchlist = []; // Initialize with an empty array
    user.search_history = []; // Initialize with an empty array
    user.clicked_products = []; // Initialize with an empty array
    return this.userRepository.save(user);
  }
}
