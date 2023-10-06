import jwt from "jsonwebtoken";

export const generateEmailToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET);
};

export const verifyEmailToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return {email: null};
  }
};
