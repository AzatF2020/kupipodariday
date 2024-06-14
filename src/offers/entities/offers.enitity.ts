import { User } from 'src/users/entities/user.enitity';
import { Wishes } from 'src/wishes/entities/wishes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { IsInt, IsBoolean } from 'class-validator';

@Entity()
export class Offers {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Wishes, (wishes) => wishes.offers)
  @JoinColumn()
  item: Wishes;

  @Column({ select: true })
  @IsInt()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
