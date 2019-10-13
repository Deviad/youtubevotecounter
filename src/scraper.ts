import ServiceContainer from "./service/ServiceContainer";
import InputDTO from "./InputDTO";
import responseHandlerProxy from "./service/responseHandlerProxy";

export default async ({authorName, url}: InputDTO): Promise<void> => {

  try {
    const page = ServiceContainer.getInstance().getService("Page");
    await page.goto(encodeURI(url as string));
    const cookies = await page.cookies();
    let bottomNotReached = [true];
    // if (!isEmpty(await page.evaluate(() => document.querySelector('[id="container"]')))) {
    responseHandlerProxy(page);

    if (await page.waitForSelector('[role="dialog"] #main')) {
      await page.click('[role="dialog"] #main #dismiss-button');
    }
    while (bottomNotReached) {
      await page.evaluate((_: unknown) => window.scrollBy(0, window.innerHeight));
      console.log("figa");
      // const hostname = url.match(/(http:\/\/|https:\/\/)([\/w]{3}\.)?([\w]+)([\.])([\w]*)([\/]?)([?].*)?/)![3];
      // await page.screenshot({path: `${hostname}.png`});
      await page.waitFor(1000);
    }
  } catch (err) {
    console.error(err.message)
  }
// }


}
