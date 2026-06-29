import { Context,  type Next } from 'hono';
import { verifyToken, type JwtPayload } from '../lib/jwt';

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ 
      success: false, 
      error: 'Unauthorized - No token provided' 
    }, 401);
  }

  const token = authHeader.substring(7);
  
  try {
    const payload = verifyToken(token);
    
    // Set user in context with proper typing
    c.set('user', payload);
    
    await next();
  } catch (error) {
    return c.json({ 
      success: false, 
      error: 'Invalid or expired token' 
    }, 401);
  }
}

// Helper to get user from context (with type safety)
export function getUserFromContext(c: Context): JwtPayload {
  const user = c.get('user');
  if (!user) {
    throw new Error('User not found in context');
  }
  return user;
}