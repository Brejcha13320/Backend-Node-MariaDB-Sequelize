import express, { Application } from "express";
import cors from "cors";

import db from "../database/connection";
import authRoutes from "../routes/auth";

export class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    auth: "/api/auth",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    //Connectar a Base de Datos
    this.dbConnection();

    //Middlewares
    this.middlewares();

    //Rutas de mi Aplicación
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Databse Online - MariaDB");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y Parseio del Body
    this.app.use(express.json());

    //Diretorio Publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor en el puerto: ${this.port}`);
    });
  }
}
