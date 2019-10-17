import ServiceContainer from "./service/ServiceContainer";
import InputDTO from "./InputDTO";

export default async ({authorName, url}: InputDTO): Promise<void> => {

  try {
    const page = ServiceContainer.getInstance().getService("Page");
    await page.goto(encodeURI(url as string));
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

    await page.click("#replies #text.style-scope.ytd-button-renderer")

  } catch (err) {
    console.error(err.message)
  }
// }


}
