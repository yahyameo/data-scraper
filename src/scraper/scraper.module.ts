// src/scraper/scraper.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapedData } from '../scraped-data/scraped-data.entity';
import { ScraperService } from './scraper.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapedData])],
  providers: [ScraperService],
  exports:[ScraperService]
  
})
export class ScraperModule {}
