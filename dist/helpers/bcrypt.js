"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPassword = exports.encryptPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encryptPassword = (password = "") => {
    const salt = bcryptjs_1.default.genSaltSync();
    return bcryptjs_1.default.hashSync(password, salt);
};
exports.encryptPassword = encryptPassword;
const validPassword = (passwordForm = "", passwordDB = "") => {
    return bcryptjs_1.default.compareSync(passwordForm, passwordDB);
};
exports.validPassword = validPassword;
//# sourceMappingURL=bcrypt.js.map