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
import {
  IsInt,
  Length,
  IsInstance,
  IsArray,
  ValidateNested,
  IsNotEmptyObject,
  IsNotEmpty,
} from 'class-validator';
import {Location, Category, TimeSlot} from './';

@Entity()
export class Activity extends BaseEntity {
  @PrimaryColumn()
  @IsInt()
  @IsNotEmpty()
  Id!: number;

  @Column()
  @Length(1, 50)
  @IsNotEmpty()
  Name!: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  Duration!: number;

  @ManyToOne(() => Category, category => category.Activities, {
    eager: true,
    cascade: true,
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @IsInstance(Category)
  @IsNotEmpty()
  Category!: Category;

  @ManyToMany(() => Location, location => location.Activities, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  @IsArray()
  @ValidateNested({each: true})
  Locations?: Location[];

  @OneToMany(() => TimeSlot, timeslot => timeslot.Activity, {
    // eager: true,
    // cascade: ['insert', 'update'],
  })
  @IsArray()
  @ValidateNested({each: true})
  TimeSlots?: Set<TimeSlot>;

  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}
