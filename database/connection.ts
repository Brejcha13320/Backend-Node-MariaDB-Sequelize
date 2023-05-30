import { Sequelize } from "sequelize";

const db = new Sequelize("backend_tg", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

export default db;
