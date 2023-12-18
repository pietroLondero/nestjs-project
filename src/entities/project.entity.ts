import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Group } from "@pietro/auth";

@Entity()
export class Project {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Group)
  @JoinTable()
  group: Group[];
}