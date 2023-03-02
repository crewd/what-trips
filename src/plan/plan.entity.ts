import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Plan {
  @PrimaryColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  tripId: number;

  @Column()
  day: number;

  @Column()
  startTime: Date;

  @Column()
  content: string;

  @Column()
  checked: boolean;

  @Column()
  coordinate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
