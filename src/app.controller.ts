import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ScraperService } from './scraper/scraper.service';

@Controller()
export class AppController {
  constructor(private readonly scraperService: ScraperService) { }

  @Get("getPosts")
  getPosts() {
    return this.scraperService.getPosts();
  }
}
