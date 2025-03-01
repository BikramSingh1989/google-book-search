import jwt from "jsonwebtoken";
import { Request } from "express";

const secret = process.env.JWT_SECRET || "mysecret";
const expiration = "2h";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = ({ req }: { req: AuthRequest }) => {
  let token = req.headers.authorization || "";

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) return req;

  try {
    const { data } = jwt.verify(token, secret) as { data: any };
    req.user = data;
  } catch (err) {
    console.log("Invalid token");
  }

  return req;
};

export const signToken = (user: any) => {
  return jwt.sign({ data: user }, secret, { expiresIn: expiration });
};
