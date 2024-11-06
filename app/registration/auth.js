import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export function setTokenToCookies(userData, rememberMe) {
  const securityKey = process.env.SECURITY_KEY;
  const tokenExpiry = rememberMe ? "7d" : "1h"; // 7 days or 1 hour
  const cookieExpiry = rememberMe ? 7 * 24 * 60 * 60 : 3600; // 7 days or 1 hour in seconds

  const token = jwt.sign(userData, securityKey, { expiresIn: tokenExpiry });

  const cookie = serialize("authToken", token, {
    maxAge: cookieExpiry, // Set maxAge based on rememberMe
    expires: new Date(Date.now() + cookieExpiry * 1000), // Set expiration based on rememberMe
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return cookie;
}
export function generateTokenForDb(userData) {
  const securityKey = process.env.SECURITY_KEY;
  const token = jwt.sign(userData, securityKey, { expiresIn: "1h" });
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
