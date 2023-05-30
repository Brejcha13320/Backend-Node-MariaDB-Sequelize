import { Request, Response } from "express";
import User from "../models/user";
import { encryptPassword, validPassword } from "../helpers/bcrypt";
import { generateJWT } from "../helpers/generate-jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //Find User
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        msg: "Credenciales incorrectas",
      });
    }

    const verifyPassword = validPassword(
      password,
      user.getDataValue("password"),
    );

    if (!verifyPassword) {
      return res.status(400).json({
        msg: "Credenciales incorrectas",
      });
    }

    const token = await generateJWT(
      user.getDataValue("id"),
      user.getDataValue("role"),
    );

    res.json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Problemas al intentar iniciar sesión",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    body.name = body.name.toUpperCase();
    body.role = body.role.toUpperCase();
    body.password = encryptPassword(body.password);
    const user = User.build(body);
    await user.save();
    res.json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Problemas al registrar el Usuario",
    });
  }
};
