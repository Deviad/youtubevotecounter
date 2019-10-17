"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceContainer_1 = __importDefault(require("./service/ServiceContainer"));
// @ts-ignore
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
// @ts-ignore
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const constantsMap_1 = __importDefault(require("./constantsMap"));
const { USER_AGENT } = constantsMap_1.default;
puppeteer_extra_1.default.use(puppeteer_extra_plugin_stealth_1.default());
const browserInstanceBuilder = async () => {
    ServiceContainer_1.default.getInstance().addService(await puppeteer_extra_1.default.launch({
        args: [
            // '--headless',
            '--shm-size=1gb',
            '--ignore-certificate-errors',
            `--user-agent=${USER_AGENT}`,
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            /*
            Simulate real browser
           */
            // `--user-data-dir=${require('os').homedir()}/Library/Application\ Support/Google/Chrome`,
            '--profile-directory=Default',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-client-side-phishing-detection',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            // '--disable-extensions',
            '--disable-hang-monitor',
            '--disable-popup-blocking',
            '--disable-prompt-on-repost',
            '--disable-sync',
            '--disable-translate',
            '--metrics-recording-only',
            '--no-first-run',
            '--safebrowsing-disable-auto-update'
        ],
        headless: false
        // executablePath: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
    }));
};
exports.default = browserInstanceBuilder;
//# sourceMappingURL=browserInstanceBuilder.js.map