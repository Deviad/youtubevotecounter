import ServiceContainer from "./service/ServiceContainer";
import InputDTO from "./InputDTO";
import {ElementHandle, Page} from "puppeteer";
import * as fs from "fs";

const root = require('app-root-path').path;

export default async ({authorName, url}: InputDTO): Promise<void> => {

  try {
    const page = ServiceContainer.getInstance().getService("Page");
    await page.goto(encodeURI(url as string));
    let bottomNotReached = true;
    let count = 0;
    await clickOnPrivacyDialog(page);
    await displayAllComments(bottomNotReached, page, count);
    await clickOnMoreRepliesButtons(page);
    await writeVotesOnFile(authorName, page);

  } catch (err) {
    console.error(err.message)
  }

}


async function writeVotesOnFile(authorName: String, page: Page) {

  const path = `${root}/votes.json`;

  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, '');
  }
  let votes = [];
  for await(const vote of getVotesByAuthor(authorName, page)) {
    console.log(vote);
    votes.push(vote);
  }
  fs.appendFileSync(path, JSON.stringify(votes))
}

async function* getVotesByAuthor(authorName: String, page: Page) {

  for (const reply of await getAllReplies(authorName, page)) {

    if (reply.author == authorName && (reply.text as String).match(/^(.*)(>>)(.*)(?=[+-])(.*)(\d+)$/)) {
      yield reply;

    }
  }
}

async function getAllReplies(author: String, page: Page) {
  return await page.evaluate((_: any) => {
    const replyBoxes = document.querySelectorAll("#loaded-replies");

    let replies: any = [];

    for (const box of replyBoxes) {
      // @ts-ignore
      for (const innerBox of box.children) {
        // @ts-ignore
        let replyAuthor = innerBox.querySelector("#body #main #header #header-author #author-text")?.innerText.trim();
        // @ts-ignore
        let replyText = innerBox.querySelector("#body #main #expander #content #content-text")?.innerText.trim();
        replies = [...replies, {author: replyAuthor, text: replyText}];
      }
    }

    return replies;

  });
}

async function displayAllComments(bottomNotReached: boolean, page: Page, count: number) {
  while (bottomNotReached) {
    await page.waitFor(1000);
    await page.evaluate((_: unknown) => window.scrollBy(0, window.innerHeight));
    const nodeElemsFactory: () => Promise<ElementHandle<Element>[]> = async () => await page.$$("#main.style-scope.ytd-comment-renderer");
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
        await page.evaluate((_: unknown) => window.scrollBy(0, window.innerHeight));

      }
    }
    count = newELemCount;
  }
}

async function clickOnMoreRepliesButtons(page: Page) {
  await page.$$eval("#more-replies", async (links: Element[]) => {
    function sleep(time: number, cb: CallableFunction = () => {
    }) {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => resolve(cb()), time);
        } catch (err) {
          reject(console.log(err));
        }
      });
    }

    for (const link of links) {
      (link as HTMLLinkElement).click();
      await sleep(1000);
    }
  });
}

async function clickOnPrivacyDialog(page: Page) {
  if (await page.waitForSelector('[role="dialog"] #main')) {
    await page.click('[role="dialog"] #main #dismiss-button');
  }
}
