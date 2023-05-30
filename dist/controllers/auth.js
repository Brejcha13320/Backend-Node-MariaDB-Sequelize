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
exports.register = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = require("../helpers/bcrypt");
const generate_jwt_1 = require("../helpers/generate-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Find User
        const user = yield user_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(400).json({
                msg: "Credenciales incorrectas",
            });
        }
        const verifyPassword = (0, bcrypt_1.validPassword)(password, user.getDataValue("password"));
        if (!verifyPassword) {
            return res.status(400).json({
                msg: "Credenciales incorrectas",
            });
        }
        const token = yield (0, generate_jwt_1.generateJWT)(user.getDataValue("id"), user.getDataValue("role"));
        res.json({
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Problemas al intentar iniciar sesión",
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        body.name = body.name.toUpperCase();
        body.role = body.role.toUpperCase();
        body.password = (0, bcrypt_1.encryptPassword)(body.password);
        const user = user_1.default.build(body);
        yield user.save();
        res.json({
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Problemas al registrar el Usuario",
        });
    }
});
exports.register = register;
//# sourceMappingURL=auth.js.map