import {IsInt, IsOptional, Length, ValidateNested} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Activity} from './';

@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn()
  @IsInt()
  Id!: number;

  @Column()
  @Length(1, 50)
  Name!: string;

  @OneToMany(() => Activity, activity => activity.Category, {
    // cascade: true,
  })
  @ValidateNested({each: true})
  @IsOptional()
  Activities?: Activity[];

  @CreateDateColumn()
  @IsOptional()
  CreatedAt!: Date;

  @UpdateDateColumn()
  @IsOptional()
  UpdatedAt!: Date;
}
