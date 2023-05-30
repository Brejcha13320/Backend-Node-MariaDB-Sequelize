"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const auth_1 = require("../controllers/auth");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.post("/login", [
    (0, express_validator_1.check)("email", "El correo es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").not().isEmpty(),
    validate_fields_1.validateFields,
], auth_1.login);
router.post("/register", [
    (0, express_validator_1.check)("name", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El correo es obligatorio").isEmail(),
    (0, express_validator_1.check)("email").custom(db_validators_1.emailExists),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("role", "El roll es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("role").custom(db_validators_1.roleExists),
    validate_fields_1.validateFields,
], auth_1.register);
exports.default = router;
//# sourceMappingURL=auth.js.map