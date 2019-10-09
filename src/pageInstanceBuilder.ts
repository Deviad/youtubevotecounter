import {Browser, Page} from "puppeteer";
import ServiceContainer from "./service/ServiceContainer";

const pageInstanceBuilder: ()=> Promise<void> = async () => {
  const browser = ServiceContainer.getInstance().getService("Browser");
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 800 });
  ServiceContainer.getInstance().addService(page);
};

export default  pageInstanceBuilder;
