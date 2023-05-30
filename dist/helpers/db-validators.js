"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleExists = exports.emailExists = void 0;
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const emailExists = (email = "") => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield user_1.default.findOne({
        where: {
            email: email,
        },
    });
    if (emailExists) {
        throw new Error(`Ya existe un usuario con el email: ${email}`);
    }
});
exports.emailExists = emailExists;
const roleExists = (role = "") => __awaiter(void 0, void 0, void 0, function* () {
    const newRole = role.toUpperCase();
    const roleExists = yield role_1.default.findOne({
        where: {
            name: newRole,
        },
    });
    if (!roleExists) {
        throw new Error(`El Role ${newRole} no existe`);
    }
});
exports.roleExists = roleExists;
//# sourceMappingURL=db-validators.js.map