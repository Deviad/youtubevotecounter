"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleep = (time, cb = () => { }) => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => resolve(cb()), time);
        }
        catch (err) {
            reject(console.log(err));
        }
    });
};
exports.default = sleep;
//# sourceMappingURL=sleep.js.map