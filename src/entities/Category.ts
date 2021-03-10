import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Activity} from './Activity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn()
  Id!: number;

  @Column()
  Name!: string;

  @OneToMany(type => Activity, activity => activity.Category, {
    // cascade: true,
  })
  Activities?: Activity[];

  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}
