import { type ClassValue, clsx } from 'clsx';
import Cookies from 'js-cookie';
import { twMerge } from 'tailwind-merge';
import { KJUR, b64utoutf8 } from 'jsrsasign';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @param token string
 */
function decodeJWT(token: string) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT');
  }
  const payload = b64utoutf8(parts[1]);
  return JSON.parse(payload);
}

type UserSession = {
  email: string;
  exp: number;
  iat: number;
  name: string;
  userId: string;
};

/**
 * @param token string
 * @param secret string
 */
function verifyJWT(token: string, secret: string) {
  try {
    return KJUR.jws.JWS.verifyJWT(token, secret, { alg: ['HS256'] });
  } catch (error) {
    return false;
  }
}

/**
 *
 * @returns user session
 */
export function getAuthSession() {
  try {
    const accessToken = Cookies.get('access_token');
    const secret = import.meta.env.VITE_JWT_SECRET;
    if (accessToken) {
      const valid = verifyJWT(accessToken, secret);
      if (!valid) return null;
      const decoded = decodeJWT(accessToken);
      return decoded as UserSession;
    }
  } catch (error) {
    console.error('Failed to decode or verify JWT:', error);
    return null;
  }
}
