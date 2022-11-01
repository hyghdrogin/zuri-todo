import jwt from "jsonwebtoken";
import config from "../config";

const secretKey = config.JWT_KEY;
/**
 *
 */
export default class jwtHelper {
  /**
   * @param {object} payload - The details to be signed
   * @param {string} secret - The JWT secret key
   * @returns {string} The JWT signed token
   */
  static async generateToken(payload: any, secret = secretKey) {
    const token = await jwt.sign(payload, secret as string, { expiresIn: "365d" });
    return token;
  }
}
