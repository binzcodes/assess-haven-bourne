import {TimeSlot} from './TimeSlot';
import {Activity} from './Activity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {IsBoolean, IsInt, Length, ValidateNested} from 'class-validator';

@Entity()
export class Location extends BaseEntity {
  @PrimaryColumn()
  @IsInt()
  Id!: number;

  @Column()
  @Length(1, 50)
  Name!: string;

  @Column()
  @IsInt()
  Capacity!: number;

  @Column()
  @IsInt()
  Tags!: number;

  @Column()
  @IsBoolean()
  Deleted!: boolean;

  @ManyToMany(() => Activity, activity => activity.Locations, {
    // cascade: true,
  })
  @ValidateNested({each: true})
  Activities?: Activity[];

  @OneToMany(() => TimeSlot, timeslot => timeslot.Location, {
    eager: true,
    cascade: true,
  })
  @ValidateNested({each: true})
  TimeSlots?: TimeSlot[];

  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}
