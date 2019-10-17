"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const root = require('app-root-path').path;
const responseHandler = (resolve, reject, page) => (respEvent) => {
    return (async (respEvent, resolve, page) => {
        try {
            // @ts-ignore
            if (respEvent.url().match('(?=.*comment_service_ajax).*')) {
                // @ts-ignore
                const authorCommentPairs = await page.evaluate((_) => {
                    const links = document.querySelectorAll("#replies #text.style-scope.ytd-button-renderer");
                    // @ts-ignore
                    // const sleep = (time:number, cb: () => any) => {
                    //   return new Promise((resolve, reject) => {
                    //     try {
                    //       setTimeout(() => resolve(cb()), time);
                    //     } catch (err) {
                    //       reject(console.log(err));
                    //     }
                    //   });
                    // };
                    // (async (sleep) => {
                    //
                    //   for (let link of links) {
                    //     // @ts-ignore
                    //     (link as HTMLAnchorElement).click();
                    //     await sleep(5000, ()=>{});
                    //   }
                    // })(sleep);
                    const test = document.querySelectorAll("#loaded-replies.style-scope.ytd-comment-replies-renderer #content-text[slot=content]");
                    console.log("test ^_^ > ", test);
                    const nodeElems = document.querySelectorAll("#main.style-scope.ytd-comment-renderer");
                    let parsedData = [];
                    nodeElems.forEach((value, key, _) => {
                        parsedData = [...parsedData,
                            {
                                author: value.children[0].children[1].innerText.split("\n")[0],
                                comment: value.children[1].innerText
                            }
                        ];
                    });
                    return parsedData;
                });
                const path = `${root}/comments.json`;
                // if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
                // }
                const rawData = fs.readFileSync(`${root}/comments.json`).toString();
                fs.appendFileSync(path, JSON.stringify({ contents: authorCommentPairs }));
            }
        }
        catch (err) {
            throw err;
        }
    })(respEvent, resolve, page);
};
exports.default = responseHandler;
// #replies #text.style-scope.ytd-button-renderer
// #loaded-replies.style-scope.ytd-comment-replies-renderer #content-text[slot=content]
//# sourceMappingURL=responseHandler.js.map