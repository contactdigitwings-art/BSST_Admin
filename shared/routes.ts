import { z } from 'zod';
import { users, members, donations } from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  unauthorized: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login' as const,
      input: z.object({ email: z.string(), password: z.string() }),
      responses: {
        200: z.object({ user: z.custom<typeof users.$inferSelect>() }),
        401: errorSchemas.unauthorized,
      }
    },
    me: {
      method: 'GET' as const,
      path: '/api/me' as const,
      responses: {
        200: z.object({ user: z.custom<typeof users.$inferSelect>() }),
        401: errorSchemas.unauthorized,
      }
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout' as const,
      responses: {
        200: z.object({ message: z.string() })
      }
    }
  },
  members: {
    list: {
      method: 'GET' as const,
      path: '/api/members' as const,
      responses: {
        200: z.array(z.custom<typeof members.$inferSelect>()),
      }
    },
    getMine: {
      method: 'GET' as const,
      path: '/api/members/me' as const,
      responses: {
        200: z.custom<typeof members.$inferSelect>().nullable(),
      }
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/members/:id/status' as const,
      input: z.object({ status: z.enum(['pending', 'verified', 'blocked']) }),
      responses: {
        200: z.custom<typeof members.$inferSelect>(),
        404: errorSchemas.notFound,
      }
    }
  },
  admin: {
    stats: {
      method: 'GET' as const,
      path: '/api/admin/stats' as const,
      responses: {
        200: z.object({
          totalCampaigns: z.number(),
          totalMembers: z.number(),
          totalDonations: z.number(),
          activeMembers: z.number(),
        })
      }
    },
    donations: {
      method: 'GET' as const,
      path: '/api/admin/donations' as const,
      responses: {
        200: z.array(z.custom<typeof donations.$inferSelect>()),
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
