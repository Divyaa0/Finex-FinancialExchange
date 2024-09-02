import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserInfo } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., 'user', 'admin'

  //One role can be assigned to many users 
  @OneToMany(() => UserInfo, (user) => user.role)
  users: UserInfo[];
}
