"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.isFinalCommentBatchReached = (guard) => (currentValue) => {
    const latestValue = [];
    if (lodash_1.isEqual(currentValue, latestValue[0])) {
        guard[0] = false;
    }
};
//# sourceMappingURL=isFinalCommentBatchReached.js.map