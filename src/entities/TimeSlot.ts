import {IsBoolean, IsDate, IsInt, IsNotEmpty} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import {Location, Activity} from './';

@Entity()
export class TimeSlot extends BaseEntity {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsInt()
  Id!: number;

  @Column()
  @IsDate()
  @IsNotEmpty()
  Starts!: Date;

  @Column()
  @IsInt()
  @IsNotEmpty()
  Capacity!: number;

  @Column()
  @IsNotEmpty()
  RemainingCapacity!: number;

  @Column()
  @IsBoolean()
  @IsNotEmpty()
  Deleted!: boolean;

  @ManyToOne(() => Location, location => location.TimeSlots, {
    // cascade: true,
  })
  Location?: Location;

  @ManyToOne(() => Activity, activity => activity.TimeSlots, {
    // cascade: true,
  })
  Activity?: Activity;

  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}
