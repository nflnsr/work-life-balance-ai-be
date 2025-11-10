import jwt, { JwtPayload } from "jsonwebtoken";

const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, String(process.env.JWT_ACCESS_SECRET));
  } catch (error) {
    return null;
  }
};

const generateAccessToken = (data: any) => {
  const payload = { ...data };
  delete payload.iat;
  delete payload.exp;

  return jwt.sign(payload, String(process.env.JWT_ACCESS_SECRET), {
    expiresIn: "3600s",
  });
};

const generateRefreshToken = (data: any) => {
  const payload = { ...data };
  delete payload.iat;
  delete payload.exp;

  return jwt.sign(payload, String(process.env.JWT_REFRESH_SECRET), {
    expiresIn: "68400s",
  });
};

const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, String(process.env.JWT_REFRESH_SECRET));
  } catch (error) {
    return null;
  }
};

const parseToken = (token: string) => {
  try {
    return <
      JwtPayload & {
        id: number;
        name: string;
        email: string;
        role: "Admin" | "User";
        created_at: string;
      }
    >jwt.decode(token);
  } catch (error) {
    return null;
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
  parseToken,
};
