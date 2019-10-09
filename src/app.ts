import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import program from 'commander';
import scraper from './scraper';
import {default as container} from "./service/ServiceContainer";
import * as puppeteer from "puppeteer";

import browserInstanceBuilder from "./browserInstanceBuilder";
import pageInstanceBuilder from "./pageInstanceBuilder";
import bannerBuilder from "./bannerBuilder";

const init = async () => {
  await browserInstanceBuilder();
  await pageInstanceBuilder();
  bannerBuilder();
  program
    .name("vote-counter")
    .version("0.0.1")
    .description("An example CLI for ordering pizza's")
    .option('-a, --author <author>', 'the author name')
    .option('-u, --url <url>', 'the url')
    .parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }

  await scraper({authorName: program.author, url: program.url});
};

init();


