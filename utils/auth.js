import jwt from "jsonwebtoken";

export const checkAuth = async (cookies) => {
  try {
    if (cookies.cookies) cookies = cookies.cookies;
    const token = cookies.get("token")?.value;
    if (!token) return null;

    let { _id } = jwt.verify(token, process.env.JWT_SECRET);
    return _id;
  } catch (error) {
    return null;
  }
};
