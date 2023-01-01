"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperFunction = void 0;
class HelperFunction {
    static validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}
exports.HelperFunction = HelperFunction;
