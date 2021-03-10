import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinTable,
} from 'typeorm';

import {Location} from './Location';
import {Category} from './Category';
import {TimeSlot} from './TimeSlot';

@Entity()
export class Activity extends BaseEntity {
  @PrimaryColumn()
  Id!: number;

  @Column()
  Name!: string;

  @Column()
  Duration!: number;

  @ManyToOne(type => Category, category => category.Activities, {
    eager: true,
    cascade: true,
  })
  Category!: Category;

  @ManyToMany(type => Location, location => location.Activities, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  Locations?: Location[];

  @OneToMany(type => TimeSlot, timeslot => timeslot.Activity, {
    // eager: true,
    // cascade: ['insert', 'update'],
  })
  TimeSlots?: TimeSlot[];

  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}
