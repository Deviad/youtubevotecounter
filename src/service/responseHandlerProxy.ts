import {Page} from "puppeteer";
import responseHandler from "./responseHandler";

const responseHandlerProxy = (page: Page) => new Promise((resolve, reject) => {
  try {
    // @ts-ignore
    page.on('response', responseHandler(resolve, reject, page));
  } catch (err) {
    reject(err);
  }
});

export default responseHandlerProxy;
