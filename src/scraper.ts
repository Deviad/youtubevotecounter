import ServiceContainer from "./service/ServiceContainer";
import InputDTO from "./InputDTO";
import sleep from "./sleep";

export default async ({authorName, url}: InputDTO): Promise<void> => {

  try {
    const page = ServiceContainer.getInstance().getService("Page");
    await page.goto(encodeURI(url as string));
    let bottomNotReached = true;
    let count = 0;
    if (await page.waitForSelector('[role="dialog"] #main')) {
      await page.click('[role="dialog"] #main #dismiss-button');
    }
    while (bottomNotReached) {
      await page.waitFor(1000);
      await page.evaluate((_: unknown) => window.scrollBy(0, window.innerHeight));
      console.log("figa");
      // const hostname = url.match(/(http:\/\/|https:\/\/)([\/w]{3}\.)?([\w]+)([\.])([\w]*)([\/]?)([?].*)?/)![3];
      // await page.screenshot({path: `${hostname}.png`});
      const nodeElemsFactory: () => Promise<NodeListOf<any>> = async () => await page.$$("#main.style-scope.ytd-comment-renderer");
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
    await page.$$eval("#more-replies", async (links: HTMLLinkElement[]) => {


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
        link.click();
        console.log("HERE I AM");
        await sleep(1000);
      }
    });


  } catch (err) {
    console.error(err.message)
  }
// }


}
