import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares/validate-fields";

import { login, register } from "../controllers/auth";
import { emailExists, roleExists } from "../helpers/db-validators";

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login,
);

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("email").custom(emailExists),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("role", "El roll es obligatorio").not().isEmpty(),
    check("role").custom(roleExists),
    validateFields,
  ],
  register,
);

export default router;
