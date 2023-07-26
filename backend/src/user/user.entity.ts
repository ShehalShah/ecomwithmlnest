import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column('jsonb', { default: [] })
  watchlist: number[]; 

  @Column('jsonb', { default: [] })
  search_history: string[]; 

  @Column('jsonb', { default: [] })
  clicked_products: number[]; 
}
