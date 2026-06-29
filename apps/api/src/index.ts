import { Hono } from 'hono';
import authRoutes from './routes/auth.routes';
import { env } from './config/env';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    service: 'api',
    status: 'running',
    version: '1.0.0',
  });
});

app.route('/auth', authRoutes);

export default {
  port: parseInt(env.PORT),
  fetch: app.fetch,
};