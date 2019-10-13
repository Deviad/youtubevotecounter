"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler_1 = __importDefault(require("./responseHandler"));
const responseHandlerProxy = (page) => new Promise((resolve, reject) => {
    try {
        // @ts-ignore
        page.on('response', responseHandler_1.default(resolve, reject, page));
    }
    catch (err) {
        reject(err);
    }
});
exports.default = responseHandlerProxy;
//# sourceMappingURL=responseHandlerProxy.js.map