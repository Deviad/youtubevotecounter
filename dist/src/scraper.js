"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceContainer_1 = __importDefault(require("./service/ServiceContainer"));
const fs = __importStar(require("fs"));
const root = require('app-root-path').path;
const path = `${root}/votes.csv`;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: path,
    header: [
        { id: 'user', title: 'USER' },
        { id: 'score', title: 'SCORE' }
    ]
});
exports.default = async ({ authorName, url }) => {
    try {
        const page = ServiceContainer_1.default.getInstance().getService("Page");
        await page.goto(encodeURI(url));
        let bottomNotReached = true;
        let count = 0;
        await clickOnPrivacyDialog(page);
        await displayAllComments(bottomNotReached, page, count);
        await clickOnMoreRepliesButtons(page);
        await writeVotesOnFile(authorName, page);
    }
    catch (err) {
        console.error(err.message);
    }
};
const promisifiedWriter = (records) => new Promise((resolve, reject) => {
    try {
        csvWriter.writeRecords(records) // returns a promise
            .then(() => {
            resolve();
        });
    }
    catch (err) {
        reject(console.log(err));
    }
});
async function writeVotesOnFile(authorName, page) {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
    }
    for await (const vote of getVotesByAuthor(authorName, page)) {
        console.log(vote);
        await promisifiedWriter(vote);
    }
    // fs.appendFileSync(path, JSON.stringify(votes))
}
async function* getVotesByAuthor(authorName, page) {
    for (const reply of await getAllReplies(authorName, page)) {
        if (reply.author == authorName && reply.text.match(/^(.*)(>>)(.*)(?=[+-])(.*)(\d+)$/)) {
            const splitTextForUser = reply.text.split(">>");
            const splitTextForVote = reply.text.split("+");
            const user = splitTextForUser[0].trim();
            const score = splitTextForVote[splitTextForVote.length - 1].trim();
            yield [{ user, score }];
        }
    }
}
async function getAllReplies(author, page) {
    return await page.evaluate((_) => {
        var _a, _b;
        const replyBoxes = document.querySelectorAll("#loaded-replies");
        let replies = [];
        for (const box of replyBoxes) {
            // @ts-ignore
            for (const innerBox of box.children) {
                // @ts-ignore
                let replyAuthor = (_a = innerBox.querySelector("#body #main #header #header-author #author-text")) === null || _a === void 0 ? void 0 : _a.innerText.trim();
                // @ts-ignore
                let replyText = (_b = innerBox.querySelector("#body #main #expander #content #content-text")) === null || _b === void 0 ? void 0 : _b.innerText.trim();
                replies = [...replies, { author: replyAuthor, text: replyText }];
            }
        }
        return replies;
    });
}
async function displayAllComments(bottomNotReached, page, count) {
    while (bottomNotReached) {
        await page.waitFor(1000);
        await page.evaluate((_) => window.scrollBy(0, window.innerHeight));
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
}
async function clickOnMoreRepliesButtons(page) {
    await page.$$eval("#more-replies", async (links) => {
        function sleep(time, cb = () => {
        }) {
            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => resolve(cb()), time);
                }
                catch (err) {
                    reject(console.log(err));
                }
            });
        }
        for (const link of links) {
            link.click();
            await sleep(1000);
        }
    });
}
async function clickOnPrivacyDialog(page) {
    if (await page.waitForSelector('[role="dialog"] #main')) {
        await page.click('[role="dialog"] #main #dismiss-button');
    }
}
//# sourceMappingURL=scraper.js.map