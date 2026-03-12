import type { Express } from "express";
import type { Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use(session({
    secret: process.env.SESSION_SECRET || 'secret123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

  // ── AUTH ──────────────────────────────────────────────────────────────────
  app.post(api.auth.login.path, async (req, res) => {
    try {
      const input = api.auth.login.input.parse(req.body);
      const user = await storage.getUserByEmail(input.email);
      if (!user || user.password !== input.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      (req.session as any).userId = user.id;
      res.json({ user });
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.auth.me.path, async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });
    const user = await storage.getUserById(userId);
    if (!user) return res.status(401).json({ message: "User not found" });
    res.json({ user });
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy(() => res.json({ message: "Logged out successfully" }));
  });

  // ── MEMBERS ──────────────────────────────────────────────────────────────
  app.get(api.members.list.path, async (_req, res) => {
    res.json(await storage.getMembers());
  });

  app.get(api.members.getMine.path, async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });
    const member = await storage.getMemberByUserId(userId);
    res.json(member || null);
  });

  app.post(api.members.apply.path, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) return res.status(401).json({ message: "Not authenticated" });
      const input = api.members.apply.input.parse(req.body);
      const member = await storage.createMember({
        userId,
        name: input.name,
        email: input.email,
        detail: input.detail,
        receipt: input.receipt || null,
        regNo: `BSST-${Date.now()}`,
        status: 'pending',
        idCardGenerated: false,
        appointmentLetterGenerated: false,
        certificateGenerated: false,
      });
      res.status(201).json(member);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch(api.members.updateStatus.path, async (req, res) => {
    try {
      const input = api.members.updateStatus.input.parse(req.body);
      const member = await storage.updateMemberStatus(Number(req.params.id), input.status);
      if (!member) return res.status(404).json({ message: "Member not found" });
      res.json(member);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else res.status(500).json({ message: "Internal server error" });
    }
  });

  // ── ADMIN STATS ──────────────────────────────────────────────────────────
  app.get(api.admin.stats.path, async (_req, res) => {
    const [membersList, donationsList, campaignsList] = await Promise.all([
      storage.getMembers(),
      storage.getDonations(),
      storage.getCampaigns(),
    ]);
    res.json({
      totalCampaigns: campaignsList.length,
      totalMembers: membersList.length,
      totalDonations: donationsList.reduce((acc, d) => acc + d.amount, 0),
      activeMembers: membersList.filter(m => m.status === 'verified').length,
    });
  });

  app.get(api.admin.donations.path, async (_req, res) => {
    res.json(await storage.getDonations());
  });

  // ── CAMPAIGNS ─────────────────────────────────────────────────────────────
  app.get('/api/campaigns', async (_req, res) => {
    res.json(await storage.getCampaigns());
  });

  app.post('/api/campaigns', async (req, res) => {
    try {
      const schema = z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        category: z.string().default('general'),
        goalAmount: z.number().positive(),
        raisedAmount: z.number().min(0).default(0),
        status: z.enum(['active', 'paused', 'completed']).default('active'),
        startDate: z.string().optional(),
        endDate: z.string().nullable().optional(),
      });
      const data = schema.parse(req.body);
      const campaign = await storage.createCampaign({
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        endDate: data.endDate ? new Date(data.endDate) : null,
      });
      res.status(201).json(campaign);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch('/api/campaigns/:id', async (req, res) => {
    try {
      const schema = z.object({
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        category: z.string().optional(),
        goalAmount: z.number().positive().optional(),
        raisedAmount: z.number().min(0).optional(),
        status: z.enum(['active', 'paused', 'completed']).optional(),
        endDate: z.string().nullable().optional(),
      });
      const data = schema.parse(req.body);
      const updated = await storage.updateCampaign(Number(req.params.id), {
        ...data,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      } as any);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete('/api/campaigns/:id', async (req, res) => {
    await storage.deleteCampaign(Number(req.params.id));
    res.json({ message: "Campaign deleted" });
  });

  await seedDatabase();
  return httpServer;
}

async function seedDatabase() {
  const { db } = await import("./db");
  const { users, members, donations, campaigns } = await import("@shared/schema");

  const existingUsers = await db.select().from(users);
  if (existingUsers.length === 0) {
    const adminUser = await storage.createUser({ email: "admin@gmail.com", password: "123456", name: "Admin User", role: "admin" });
    const regularUser = await storage.createUser({ email: "user@gmail.com", password: "123456", name: "John Doe", role: "user" });

    await db.insert(members).values([
      { userId: regularUser.id, regNo: "BSST-2024-001", name: "John Doe", email: "user@gmail.com", detail: "Regular Member", receipt: "RCPT-001", status: "verified", idCardGenerated: true, appointmentLetterGenerated: true, certificateGenerated: true },
      { userId: null, regNo: "BSST-2024-002", name: "Jane Smith", email: "jane@example.com", detail: "New Application", receipt: "RCPT-002", status: "pending", idCardGenerated: false, appointmentLetterGenerated: false, certificateGenerated: false },
    ]);

    await db.insert(donations).values([
      { amount: 5000, donorName: "Alice Cooper" },
      { amount: 12000, donorName: "Bob Builder" },
    ]);

    await db.insert(campaigns).values([
      { title: "Rural Healthcare Drive", description: "Providing free medical check-ups and medicines to 70+ villages in Araria district.", category: "healthcare", goalAmount: 500000, raisedAmount: 320000, status: "active" },
      { title: "Education for All", description: "Setting up digital learning centres and distributing textbooks to underprivileged children.", category: "education", goalAmount: 300000, raisedAmount: 180000, status: "active" },
      { title: "Clean Water Initiative", description: "Installing water purification systems and sanitation facilities in rural communities.", category: "welfare", goalAmount: 200000, raisedAmount: 200000, status: "completed" },
    ]);
  }
}
