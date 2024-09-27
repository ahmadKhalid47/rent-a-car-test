import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export function setTokenToCookies(userData) {
  const securityKey = process.env.SECURITY_KEY;
  const token = jwt.sign(userData, securityKey, { expiresIn: "3h" });

  const cookie = serialize("authToken", token, {
    maxAge: 10800, // 3 hours in seconds (3 * 3600)
    expires: new Date(Date.now() + 10800 * 1000), // 3 hours in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return cookie;
}

export function generateTokenForDb(userData) {
  const securityKey = process.env.SECURITY_KEY;
  const token = jwt.sign(userData, securityKey, { expiresIn: "3h" });
  const decoded = jwt.decode(token);
  const expiryDate = new Date(decoded.exp * 1000);

  return { token, expiryDate };
}

export function removeTokenFromCookies() {
  const cookie = serialize("authToken", "", {
    maxAge: -1,
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return cookie;
}
