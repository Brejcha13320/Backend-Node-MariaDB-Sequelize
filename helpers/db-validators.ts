import User from "../models/user";
import Role from "../models/role";

export const emailExists = async (email = "") => {
  const emailExists = await User.findOne({
    where: {
      email: email,
    },
  });
  if (emailExists) {
    throw new Error(`Ya existe un usuario con el email: ${email}`);
  }
};

export const roleExists = async (role = "") => {
  const newRole = role.toUpperCase();
  const roleExists = await Role.findOne({
    where: {
      name: newRole,
    },
  });
  if (!roleExists) {
    throw new Error(`El Role ${newRole} no existe`);
  }
};
