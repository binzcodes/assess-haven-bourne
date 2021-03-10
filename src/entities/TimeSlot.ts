import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import {Location} from './Location';
import {Activity} from './Activity';

@Entity()
export class TimeSlot extends BaseEntity {
  @PrimaryColumn()
  Id!: number;

  @Column()
  Starts!: Date;

  @Column()
  Capacity!: number;

  @Column()
  RemainingCapacity!: number;

  @Column()
  Deleted!: boolean;

  @ManyToOne(type => Location, location => location.TimeSlots, {
    // cascade: true,
  })
  Location?: Location;

  @ManyToOne(type => Activity, activity => activity.TimeSlots, {
    // cascade: true,
  })
  Activity?: Activity;

  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}
