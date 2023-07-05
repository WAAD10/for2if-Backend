import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nft extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying' })
  name: string;

  @Column({ type: 'character varying' })
  image: string;

  @Column({ type: 'character varying' })
  desc: string;
}
