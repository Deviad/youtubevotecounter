import ServiceContainer from "./service/ServiceContainer";
// @ts-ignore
import puppeteer from "puppeteer-extra";
// @ts-ignore
import pluginStealth from "puppeteer-extra-plugin-stealth";

import {default as constants} from "./constantsMap";

const {USER_AGENT} = constants;
puppeteer.use(pluginStealth());
const browserInstanceBuilder: ()=> Promise<void> = async () => {
  ServiceContainer.getInstance().addService(
    await puppeteer.launch({
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
    })
  );
};

export default browserInstanceBuilder;
