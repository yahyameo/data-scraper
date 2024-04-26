// src/scraped-data/scraped-data.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ScrapedData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;
}
