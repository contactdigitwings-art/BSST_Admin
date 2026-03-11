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
  // Simple session setup
  app.use(session({
    secret: process.env.SESSION_SECRET || 'secret123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

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
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get(api.auth.me.path, async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await storage.getUserById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    res.json({ user });
  });
  
  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get(api.members.list.path, async (req, res) => {
    const allMembers = await storage.getMembers();
    res.json(allMembers);
  });

  app.get(api.members.getMine.path, async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const member = await storage.getMemberByUserId(userId);
    res.json(member || null);
  });

  app.post(api.members.apply.path, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const input = api.members.apply.input.parse(req.body);
      
      const member = await storage.createMember({
        userId,
        name: input.name,
        email: input.email,
        detail: input.detail,
        receipt: input.receipt || null,
        regNo: `NGO-${Date.now()}`,
        status: 'pending',
        idCardGenerated: false,
        appointmentLetterGenerated: false,
        certificateGenerated: false
      });

      res.status(201).json(member);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.patch(api.members.updateStatus.path, async (req, res) => {
    try {
      const input = api.members.updateStatus.input.parse(req.body);
      const member = await storage.updateMemberStatus(Number(req.params.id), input.status);
      
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      
      res.json(member);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get(api.admin.stats.path, async (req, res) => {
    const membersList = await storage.getMembers();
    const donationsList = await storage.getDonations();
    
    res.json({
      totalCampaigns: 5,
      totalMembers: membersList.length,
      totalDonations: donationsList.reduce((acc, curr) => acc + curr.amount, 0),
      activeMembers: membersList.filter(m => m.status === 'verified').length,
    });
  });

  app.get(api.admin.donations.path, async (req, res) => {
    const donations = await storage.getDonations();
    res.json(donations);
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const { db } = await import("./db");
  const { users, members, donations } = await import("@shared/schema");
  
  const existingUsers = await db.select().from(users);
  
  if (existingUsers.length === 0) {
    const adminUser = await storage.createUser({
      email: "admin@gmail.com",
      password: "123456",
      name: "Admin User",
      role: "admin"
    });
    
    const regularUser = await storage.createUser({
      email: "user@gmail.com",
      password: "123456",
      name: "John Doe",
      role: "user"
    });
    
    await db.insert(members).values({
      userId: regularUser.id,
      regNo: "NGO-2024-001",
      name: "John Doe",
      email: "user@gmail.com",
      detail: "Regular Member",
      receipt: "RCPT-001",
      status: "verified",
      idCardGenerated: true,
      appointmentLetterGenerated: true,
      certificateGenerated: false
    });
    
    await db.insert(members).values({
      userId: null,
      regNo: "NGO-2024-002",
      name: "Jane Smith",
      email: "jane@example.com",
      detail: "New Application",
      receipt: "RCPT-002",
      status: "pending",
      idCardGenerated: false,
      appointmentLetterGenerated: false,
      certificateGenerated: false
    });

    await db.insert(donations).values([
      { amount: 500, donorName: "Alice Cooper" },
      { amount: 1200, donorName: "Bob Builder" }
    ]);
  }
}
