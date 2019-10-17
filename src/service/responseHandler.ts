import Response, {Page} from "puppeteer";
import * as fs from "fs";
import {IIndexable} from "typings/index";
import sleep from "../sleep";

const root = require('app-root-path').path;
const responseHandler = (resolve: Function, reject: Function, page: Page) => (respEvent: Response) => {
  return (async (respEvent, resolve: Function, page: Page) => {
    try {
      // @ts-ignore
      if (respEvent.url().match('(?=.*comment_service_ajax).*')) {

        // @ts-ignore
        const authorCommentPairs = await page.evaluate((_: unknown) => {

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
          const nodeElems: NodeListOf<any> = document.querySelectorAll("#main.style-scope.ytd-comment-renderer");
          let parsedData: IIndexable[] = [];


          nodeElems.forEach((value, key, _) => {
            parsedData = [...parsedData,
              {
                author: value.children[0].children[1].innerText.split("\n")[0],
                comment: value.children[1].innerText
              }
            ]
          });
          return parsedData;
        });
        const path = `${root}/comments.json`;
        // if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');

        // }
        const rawData: string = fs.readFileSync(`${root}/comments.json`).toString();

        fs.appendFileSync(path, JSON.stringify({contents: authorCommentPairs}));
      }
    } catch (err) {
      throw err;
    }
  })(respEvent, resolve, page);
};

export default responseHandler;

// #replies #text.style-scope.ytd-button-renderer
// #loaded-replies.style-scope.ytd-comment-replies-renderer #content-text[slot=content]
