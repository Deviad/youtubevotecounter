"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clear_1 = __importDefault(require("clear"));
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const bannerBuilder = () => {
    clear_1.default();
    console.log(chalk_1.default.green(figlet_1.default.textSync('Vote Counter', {
        font: "ANSI Shadow",
        horizontalLayout: "default",
    })));
};
exports.default = bannerBuilder;
//# sourceMappingURL=bannerBuilder.js.map