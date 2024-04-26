// src/scraper/scraper.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScrapedData } from 'src/scraped-data/scraped-data.entity';

@Injectable()
export class ScraperService implements OnModuleInit {
    constructor(
        @InjectRepository(ScrapedData)
        private scrapedDataRepository: Repository<ScrapedData>,
    ) { }

    async onModuleInit(): Promise<void> {
        let channelUrl = "https://twitter.com/coindesk";
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(channelUrl);
        let posts = [];
        try {
            posts = await page.evaluate(() => {
                const extractedData = [];
                const elements = document.querySelectorAll('.css-175oi2r div[lang="en"]');
                elements.forEach((element) => {
                    extractedData.push(element.textContent);
                });
                return extractedData;
            });

        } catch (error) {
            console.log(error)
        }

        await browser.close();

        const entities = posts.map((text) => {
            const entity = new ScrapedData();
            entity.text = text;
            return entity;
        });
        console.log("posts",entities);
        if (entities.length) await this.scrapedDataRepository.save(entities);
    }
    async getPosts() {
        return await this.scrapedDataRepository.find();
    }
}
