"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = __importDefault(require("commander"));
const scraper_1 = __importDefault(require("./scraper"));
clear_1.default();
console.log(chalk_1.default.green(figlet_1.default.textSync('pizza-cli', { horizontalLayout: 'full' })));
commander_1.default
    .name("pizza")
    .description("An example CLI for ordering pizza's")
    .option('-a, --author', 'The author name')
    .option('-u, --url', 'The url')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
scraper_1.default({ authorName: commander_1.default.author, url: commander_1.default.url });
//# sourceMappingURL=app.js.map