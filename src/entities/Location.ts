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

@Entity()
export class Location extends BaseEntity {
  @PrimaryColumn()
  Id!: number;

  @Column()
  Name!: string;

  @Column()
  Capacity!: number;

  @Column()
  Tags!: number;

  @Column()
  Deleted!: boolean;

  @ManyToMany(type => Activity, activity => activity.Locations, {
    cascade: ['insert', 'update'],
  })
  Activities?: Activity[];

  @OneToMany(type => TimeSlot, timeslot => timeslot.Location, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  TimeSlots?: TimeSlot[];

  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}
