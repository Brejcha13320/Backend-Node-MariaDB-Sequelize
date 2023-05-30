import { DataTypes } from "sequelize";
import db from "../database/connection";

const Role = db.define("Role", {
  name: {
    type: DataTypes.STRING,
  },
});

export default Role;
