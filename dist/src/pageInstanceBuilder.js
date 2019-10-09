"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceContainer_1 = __importDefault(require("./service/ServiceContainer"));
const pageInstanceBuilder = async () => {
    const browser = ServiceContainer_1.default.getInstance().getService("Browser");
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 800 });
    ServiceContainer_1.default.getInstance().addService(page);
};
exports.default = pageInstanceBuilder;
//# sourceMappingURL=pageInstanceBuilder.js.map