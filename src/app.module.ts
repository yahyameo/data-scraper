// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapedData } from './scraped-data/scraped-data.entity';
import { ScraperModule } from './scraper/scraper.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'developer_123',
      database: 'scraper-db',
      entities: [ScrapedData],
      synchronize: true,
    }),
    ScraperModule,
  ],
  controllers:[AppController]
})
export class AppModule {}
