import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

// register user
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, occupation } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
  } catch (err) {}
};
