"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const scraper_1 = __importDefault(require("./scraper"));
const browserInstanceBuilder_1 = __importDefault(require("./browserInstanceBuilder"));
const pageInstanceBuilder_1 = __importDefault(require("./pageInstanceBuilder"));
const bannerBuilder_1 = __importDefault(require("./bannerBuilder"));
const init = async () => {
    await browserInstanceBuilder_1.default();
    await pageInstanceBuilder_1.default();
    bannerBuilder_1.default();
    commander_1.default
        .name("vote-counter")
        .version("0.0.1")
        .description("An example CLI for ordering pizza's")
        .option('-a, --author <author>', 'the author name')
        .option('-u, --url <url>', 'the url')
        .parse(process.argv);
    if (!process.argv.slice(2).length) {
        commander_1.default.outputHelp();
    }
    await scraper_1.default({ authorName: commander_1.default.author, url: commander_1.default.url });
};
init();
//# sourceMappingURL=app.js.map