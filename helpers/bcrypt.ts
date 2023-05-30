import bcryptjs from "bcryptjs";

export const encryptPassword = (password = "") => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

export const validPassword = (passwordForm = "", passwordDB = "") => {
  return bcryptjs.compareSync(passwordForm, passwordDB);
};
