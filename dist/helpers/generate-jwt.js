"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id = "", role = "") => {
    return new Promise((resolve, reject) => {
        const payload = { id, role };
        const jwtKey = process.env.JWT_KEY;
        jsonwebtoken_1.default.sign(payload, jwtKey, {
            expiresIn: "5h",
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se puedo generar el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=generate-jwt.js.map