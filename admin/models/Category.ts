import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length, Matches } from "class-validator";
import { validationRegex } from "@/lib/validation";

@Entity({
  name: "categories",
})
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    unique: true,
    length: 100,
    type: "varchar",
  })
  @Length(3, 100)
  name!: string;

  @Column({
    unique: true,
    length: 100,
    type: "varchar",
  })
  @Length(3, 100)
  @Matches(validationRegex.slug)
  slug!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}
