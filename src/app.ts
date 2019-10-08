import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import program from 'commander';
import scraper from './scraper';
clear();
console.log(
  chalk.green(
    figlet.textSync('pizza-cli', {horizontalLayout: 'full'})
  )
);

program
  .name("pizza")
  .description("An example CLI for ordering pizza's")
  .option('-a, --author', 'The author name')
  .option('-u, --url', 'The url')
  .parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
scraper({authorName: program.author, url: program.url});


