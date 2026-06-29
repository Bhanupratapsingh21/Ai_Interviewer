import { Hono } from 'hono';
import { z } from 'zod';
import { signupSchema, loginSchema } from '../schemas/auth.schema';
import { AuthService } from '../services/auth.service';
import { authMiddleware } from '../middleware/auth';
import type { JwtPayload } from '../types';

const auth = new Hono();

auth.post('/signup', async (c) => {
  try {
    const body = await c.req.json();
    const validated = signupSchema.parse(body);
    const result = await AuthService.signup(validated);
    return c.json({ success: true, data: result }, 201);
  } catch (error: any) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return c.json({ 
        success: false, 
        error: 'Validation failed',
        errors: error.issues 
      }, 400);
    }
    return c.json({ 
      success: false, 
      error: error.message || 'Signup failed' 
    }, 400);
  }
});

auth.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const validated = loginSchema.parse(body);
    const result = await AuthService.login(validated.email, validated.password);
    return c.json({ success: true, data: result });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        success: false, 
        error: 'Validation failed',
        errors: error.issues 
      }, 400);
    }
    return c.json({ 
      success: false, 
      error: error.message || 'Login failed' 
    }, 401);
  }
});

auth.get('/me', authMiddleware, async (c) => {
  try {
    // Get user from context with proper typing
    const user = c.get('user') as JwtPayload;
    const result = await AuthService.getMe(user.accountId);
    return c.json({ success: true, data: result });
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to get user' 
    }, 400);
  }
});

auth.post('/logout', authMiddleware, async (c) => {
  // In production, invalidate refresh token session
  return c.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
});

// Optional: Refresh token endpoint
auth.post('/refresh', async (c) => {
  try {
    const body = await c.req.json();
    const { refreshToken } = body;
    
    if (!refreshToken) {
      return c.json({ 
        success: false, 
        error: 'Refresh token required' 
      }, 400);
    }
    
    // Implement refresh logic here
    // const result = await AuthService.refreshToken(refreshToken);
    // return c.json({ success: true, data: result });
    
    return c.json({ 
      success: false, 
      error: 'Refresh not implemented yet' 
    }, 501);
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 400);
  }
});

export default auth;