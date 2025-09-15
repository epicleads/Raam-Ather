import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'marketing';
  name: string;
}

// SECURITY FIX: Never expose default passwords in production
function getAdminCredentials() {
  return {
    'admin@raam.ather': {
      password: process.env.ADMIN_PASSWORD || (() => {
        if (process.env.NODE_ENV === 'production') {
          throw new Error('ADMIN_PASSWORD environment variable must be set in production');
        }
        return 'AtherAdmin2024!';
      })(),
      role: 'admin' as const,
      name: 'Raam Admin',
      id: '1'
    },
    'marketing@raam.ather': {
      password: process.env.MARKETING_PASSWORD || (() => {
        if (process.env.NODE_ENV === 'production') {
          throw new Error('MARKETING_PASSWORD environment variable must be set in production');
        }
        return 'AtherMarketing2024!';
      })(),
      role: 'marketing' as const,
      name: 'Marketing Team',
      id: '2'
    }
  };
}

export const AUTH_COOKIE_NAME = 'ather-admin-session';
export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function hashPassword(password: string): string {
  // SECURITY FIX: Use proper password hashing
  // Note: In production, consider using bcrypt or argon2
  const salt = process.env.PASSWORD_SALT || 'raam-ather-salt-2024';
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function createSessionToken(user: AdminUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Date.now() + SESSION_DURATION,
    iat: Date.now(), // issued at
    nonce: Math.random().toString(36) // add randomness
  };

  // SECURITY FIX: Add basic signing to prevent tampering
  const secret = process.env.JWT_SECRET || (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable must be set in production');
    }
    return 'dev-secret-key-2024';
  })();

  const token = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto.createHmac('sha256', secret).update(token).digest('hex');

  return `${token}.${signature}`;
}

export function verifySessionToken(token: string): AdminUser | null {
  try {
    // SECURITY FIX: Verify signature before processing
    const [tokenPart, signature] = token.split('.');
    if (!tokenPart || !signature) {
      return null; // Invalid token format
    }

    const secret = process.env.JWT_SECRET || (() => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET environment variable must be set in production');
      }
      return 'dev-secret-key-2024';
    })();

    const expectedSignature = crypto.createHmac('sha256', secret).update(tokenPart).digest('hex');
    if (signature !== expectedSignature) {
      return null; // Invalid signature
    }

    const payload = JSON.parse(Buffer.from(tokenPart, 'base64').toString());

    if (payload.exp < Date.now()) {
      return null; // Token expired
    }

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      name: payload.name
    };
  } catch {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<AdminUser | null> {
  const adminCredentials = getAdminCredentials();
  const userCredentials = adminCredentials[email as keyof typeof adminCredentials];
  
  if (!userCredentials || userCredentials.password !== password) {
    return null;
  }
  
  return {
    id: userCredentials.id,
    email,
    role: userCredentials.role,
    name: userCredentials.name
  };
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
    
    if (!sessionCookie) {
      return null;
    }
    
    return verifySessionToken(sessionCookie.value);
  } catch {
    return null;
  }
}

export function getSessionFromRequest(request: NextRequest): AdminUser | null {
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);
  
  if (!sessionCookie) {
    return null;
  }
  
  return verifySessionToken(sessionCookie.value);
}