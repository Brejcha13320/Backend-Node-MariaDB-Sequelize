import jwt from "jsonwebtoken";

export const generateJWT = (id = "", role = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id, role };
    const jwtKey = process.env.JWT_KEY as string;

    jwt.sign(
      payload,
      jwtKey,
      {
        expiresIn: "5h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puedo generar el token");
        } else {
          resolve(token);
        }
      },
    );
  });
};
