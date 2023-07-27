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
    user.watchlist = []; 
    user.search_history = []; 
    user.clicked_products = []; 
    return this.userRepository.save(user);
  }

  async addToClickedProducts(userId: number, productId: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id:userId } });

    if (!user) {
      return null; 
    }

    user.clicked_products.push(productId);

    return this.userRepository.save(user);
  }

  async findById(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id:userId } });
  }

  async addToWatchlist(userId: number, productId: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }
    
    if (!user.watchlist.includes(productId)) {
      user.watchlist.push(productId);
    }

    return this.userRepository.save(user);
  }

  async removeFromWatchlist(userId: number, productId: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }

    const index = user.watchlist.indexOf(productId);
    if (index !== -1) {
      user.watchlist.splice(index, 1);
    }

    return this.userRepository.save(user);
  }
}
