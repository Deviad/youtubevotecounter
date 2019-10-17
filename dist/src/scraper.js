"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceContainer_1 = __importDefault(require("./service/ServiceContainer"));
exports.default = async ({ authorName, url }) => {
    try {
        const page = ServiceContainer_1.default.getInstance().getService("Page");
        await page.goto(encodeURI(url));
        const cookies = await page.cookies();
        let bottomNotReached = true;
        // if (!isEmpty(await page.evaluate(() => document.querySelector('[id="container"]')))) {
        // responseHandlerProxy(page);
        let count = 0;
        if (await page.waitForSelector('[role="dialog"] #main')) {
            await page.click('[role="dialog"] #main #dismiss-button');
        }
        while (bottomNotReached) {
            await page.waitFor(1000);
            await page.evaluate((_) => window.scrollBy(0, window.innerHeight));
            console.log("figa");
            // const hostname = url.match(/(http:\/\/|https:\/\/)([\/w]{3}\.)?([\w]+)([\.])([\w]*)([\/]?)([?].*)?/)![3];
            // await page.screenshot({path: `${hostname}.png`});
            const nodeElemsFactory = async () => await page.$$("#main.style-scope.ytd-comment-renderer");
            const newELemCount = (await nodeElemsFactory()).length;
            if (count === newELemCount) {
                for (let i = 0; i < 4; i++) {
                    const nowElementCount = (await nodeElemsFactory()).length;
                    if (newELemCount !== nowElementCount) {
                        break;
                    }
                    if (i == 3) {
                        bottomNotReached = false;
                        break;
                    }
                    await page.waitFor(1000);
                    await page.evaluate((_) => window.scrollBy(0, window.innerHeight));
                }
            }
            count = newELemCount;
        }
        await page.click("#replies #text.style-scope.ytd-button-renderer");
    }
    catch (err) {
        console.error(err.message);
    }
    // }
};
//# sourceMappingURL=scraper.js.map