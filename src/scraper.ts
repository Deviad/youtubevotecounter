import ServiceContainer from "./service/ServiceContainer";
import InputDTO from "./InputDTO";
import sleep from "./sleep";
import {ElementHandle, Page} from "puppeteer";




export default async ({authorName, url}: InputDTO): Promise<void> => {

  try {
    const page = ServiceContainer.getInstance().getService("Page");
    await page.goto(encodeURI(url as string));
    let bottomNotReached = true;
    let count = 0;
    await clickOnPrivacyDialog(page);
    await displayAllComments(bottomNotReached, page, count);
    await clickOnMoreRepliesButtons(page);

  } catch (err) {
    console.error(err.message)
  }

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
    function sleep(time: number, cb: CallableFunction = ()=>{}) {
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

async function clickOnPrivacyDialog(page:Page) {
  if (await page.waitForSelector('[role="dialog"] #main')) {
    await page.click('[role="dialog"] #main #dismiss-button');
  }
}
