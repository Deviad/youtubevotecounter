"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceContainer_1 = __importDefault(require("./service/ServiceContainer"));
const responseHandlerProxy_1 = __importDefault(require("./service/responseHandlerProxy"));
exports.default = async ({ authorName, url }) => {
    try {
        const page = ServiceContainer_1.default.getInstance().getService("Page");
        await page.goto(encodeURI(url));
        const cookies = await page.cookies();
        let bottomNotReached = [true];
        // if (!isEmpty(await page.evaluate(() => document.querySelector('[id="container"]')))) {
        responseHandlerProxy_1.default(page);
        if (await page.waitForSelector('[role="dialog"] #main')) {
            await page.click('[role="dialog"] #main #dismiss-button');
        }
        while (bottomNotReached) {
            await page.evaluate((_) => window.scrollBy(0, window.innerHeight));
            console.log("figa");
            // const hostname = url.match(/(http:\/\/|https:\/\/)([\/w]{3}\.)?([\w]+)([\.])([\w]*)([\/]?)([?].*)?/)![3];
            // await page.screenshot({path: `${hostname}.png`});
            await page.waitFor(1000);
        }
    }
    catch (err) {
        console.error(err.message);
    }
    // }
};
//# sourceMappingURL=scraper.js.map