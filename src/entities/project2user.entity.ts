import { PrimaryGeneratedColumn, Column, Index, Entity, ManyToOne } from "typeorm";
import { Project } from "./project.entity";
import { User } from "@pietro/auth";

@Entity()
export abstract class Project2User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  read: boolean;

  @Column()
  write: boolean;

  @Column()
  delete: boolean;
}

export class Test extends Project2User {
  @ManyToOne(() => Project)
  project: Project;
}