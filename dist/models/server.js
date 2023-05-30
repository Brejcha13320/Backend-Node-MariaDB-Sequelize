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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../database/connection"));
const auth_1 = __importDefault(require("../routes/auth"));
class Server {
    constructor() {
        this.apiPaths = {
            auth: "/api/auth",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        //Connectar a Base de Datos
        this.dbConnection();
        //Middlewares
        this.middlewares();
        //Rutas de mi Aplicación
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Databse Online - MariaDB");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura y Parseio del Body
        this.app.use(express_1.default.json());
        //Diretorio Publico
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.auth, auth_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor en el puerto: ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map