import type { Express } from "express";
import type { Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertDonationSchema } from "@shared/schema";

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
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Compare plaintext password with stored password (handles both hashed and plaintext)
      const isPasswordValid = await storage.comparePassword(input.password, user.password, user.id);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      (req.session as any).userId = user.id;
      // Don't send hashed password to client
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      const existingUser = await storage.getUserByEmail(input.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await storage.createUser({
        email: input.email,
        password: input.password,
        name: input.name,
        role: 'user',
      });
      (req.session as any).userId = user.id;
      // Don't send hashed password to client
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
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
    // Don't send hashed password to client
    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
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

  // routes.ts

app.post(api.members.apply.path, async (req, res) => {
  try {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    console.log('req.body:', req.body); // Debug log

    // 1. Validate the input
    const input = req.body;

    // 2. Map 'input.name' (from Zod) to 'fullName' (Database Column)
    const member = await storage.createMember({
      userId,
      fullName: input.name,  
      position: "member", // Default position
      email: input.email,
      phone: input.phone,
      gender: input.gender,
      age: input.age,
      address: input.address,
      projectArea: input.projectArea,
      regNo: `BSST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString(),
      status: 'pending',
      idCardGenerated: false,
      appointmentLetterGenerated: false,
    });

    res.status(201).json(member);
  } catch (err) {
    console.error('Error in apply:', err); // Debug log
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

  // Update status and "unlock" the generation of letters
app.patch(api.members.updateStatus.path, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, position } = api.members.updateStatus.input.parse(req.body);

    const updateData: any = { status };
    
    // If position is provided, update it
    if (position !== undefined) {
      updateData.position = position;
    }
    
    // If admin verifies, we can automatically enable card generation
    if (status === 'verified') {
      updateData.idCardGenerated = true;
      updateData.appointmentLetterGenerated = true;
    }

    const member = await storage.updateMemberStatus(id, updateData);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to update member" });
  }
});
app.post('/api/donations', async (req, res) => {
  try {
    console.log("Received donation request:", req.body); // Debug log
    // 1. Validate the input using our shared schema
    const input = insertDonationSchema.parse(req.body);
    const userId = (req.session as any).userId;

    // 2. Use member details from request if provided, otherwise look up from session
    let memberId = input.memberId;
    let regNo = input.regNo;
    let email = input.email;
    let phone = input.phone;

    if (!memberId && userId) {
      // Fallback: look up member from session
      const member = await storage.getMemberByUserId(userId);
      if (member) {
        memberId = member.id;
        regNo = member.regNo;
        email = member.email;
        phone = member.phone;
      }
    }

    // 3. Prepare data for Drizzle (Database)
    const donationData = {
      amount: input.amount,
      donorName: input.donorName,
      panCardNumber: input.panCardNumber,
      details: input.details,
      campaignId: input.campaignId,
      memberId: memberId,
      regNo: regNo,
      email: email,
      phone: phone,
      paymentId: input.paymentId,
      eightyGCertificateGenerated: input.eightyGCertificateGenerated || !!memberId, // Automatically true if linked to a member
    };

    // 4. Validate against the DB insert schema
    const validatedData = insertDonationSchema.parse(donationData);
    const newDonation = await storage.createDonation(validatedData);

    res.status(201).json(newDonation);
  } catch (err) {
    // This will print the actual DB error in your terminal
    console.error("DONATION_ERROR:", err); 
    
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error: Database sync failed." });
    }
  }
}); 

 // server/routes.ts



  // ── CAMPAIGNS ─────────────────────────────────────────────────────────────
  app.get('/api/campaigns', async (_req, res) => {
    res.json(await storage.getCampaigns());
  });

  app.get('/api/campaigns/frontend', async (_req, res) => {
    res.json(await storage.getCampaignsFrontend());
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

  // ── ADMIN ────────────────────────────────────────────────────────────────
  app.get('/api/admin/donations', async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });
    
    const user = await storage.getUserById(userId);
    if (!user || user.role !== 'admin') return res.status(403).json({ message: "Admin access required" });
    
    res.json(await storage.getDonations());
  });

  app.get('/api/admin/stats', async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });
    
    const user = await storage.getUserById(userId);
    if (!user || user.role !== 'admin') return res.status(403).json({ message: "Admin access required" });
    
    const members = await storage.getMembers();
    const donations = await storage.getDonations();
    const totalMembers = members.length;
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    res.json({
      totalMembers,
      totalDonations,
    });
  });

  try {
    await seedDatabase();
    console.log("✅ Database seeded");
  } catch (err) {
    console.error("Seed failed (ignored):", err);
  }
  return httpServer;
}

async function seedDatabase() {
  const { db } = await import("./db");
  const { users, members, donations, campaigns } = await import("@shared/schema");

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

    await db.insert(members).values([
      { 
        userId: regularUser.id, 
        regNo: "BSST-2024-001", 
        fullName: "John Doe", 
        email: "user@gmail.com", 
        phone: "9876543210",
        gender: "Male",
        age: 30,
        address: "123 Street, Bihar",
        projectArea: "Education",
        date: new Date().toLocaleDateString(),
        status: "verified", 
        idCardGenerated: true, 
        appointmentLetterGenerated: true 
      },
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
