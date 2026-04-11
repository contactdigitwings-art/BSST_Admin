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
    register: {
      method: 'POST' as const,
      path: '/api/register' as const,
      input: z.object({ email: z.string(), password: z.string(), name: z.string() }),
      responses: {
        201: z.object({ user: z.custom<typeof users.$inferSelect>() }),
        400: errorSchemas.validation,
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
    // @shared/routes.ts

apply: {
  method: 'POST' as const,
  path: '/api/members/apply' as const,
  input: z.object({
    name: z.string().min(1),        // Frontend sends 'name'
    email: z.string().email(),
    phone: z.string().min(1),
    gender: z.string().min(1),
    age: z.coerce.number().min(1),
    address: z.string().min(1),
    projectArea: z.string().min(1),
  }),
  responses: {
    201: z.custom<typeof members.$inferSelect>(),
    400: errorSchemas.validation,
  }
},
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/members/:id/status' as const,
      input: z.object({ 
        status: z.enum(['pending', 'verified', 'blocked']),
        position: z.string().optional()
      }),
      responses: {
        200: z.object({
        id: z.number(),
        regNo: z.string(),
        fullName: z.string(),
        status: z.enum(['pending', 'verified', 'blocked']),
        position: z.string(),
        // Add other fields you want to show, but OMIT the generated flags
      }),
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
    create: {
      method: 'POST' as const,
      path: '/api/donations' as const,
      input: z.object({
        amount: z.coerce.number().positive(),
        donorName: z.string().min(1),
        panCardNumber: z.string().min(10).max(10).toUpperCase(),
        paymentId: z.string().min(1),
        details: z.string().min(1),
        campaignId: z.number().positive(),
        eightyGCertificateGenerated: z.boolean().optional(),
      }),
      responses: {
        201: z.custom<typeof donations.$inferSelect>(),
        400: errorSchemas.validation,
      }
    },
    listAdmin: {
      method: 'GET' as const,
      path: '/api/admin/donations' as const,
      responses: {
        200: z.array(z.custom<typeof donations.$inferSelect>()),
      }
    }
  },
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
