import type { JwtPayload } from '../lib/jwt';

// Extend Hono's Context Variable Types
declare module 'hono' {
  interface ContextVariableMap {
    user: JwtPayload;
  }
}

// Re-export for convenience
export type { JwtPayload };