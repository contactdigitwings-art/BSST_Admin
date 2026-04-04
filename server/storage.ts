import { db } from "./db";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";
import {
  users, members, donations, campaigns,
  type User, type InsertUser,
  type Member, type InsertMember,
  type Donation, type InsertDonation,
  type Campaign, type InsertCampaign,
} from "@shared/schema";

export interface IStorage {
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPassword(id: number, hashedPassword: string): Promise<void>;
  comparePassword(plainPassword: string, storedPassword: string, userId: number): Promise<boolean>;

  getMembers(): Promise<Member[]>;
  getMemberByUserId(userId: number): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  updateMemberStatus(id: number, updateData: Partial<Member>): Promise<Member>;

  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonations(): Promise<Donation[]>;

  getCampaigns(): Promise<Campaign[]>;
  getCampaignById(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: number, data: Partial<InsertCampaign>): Promise<Campaign>;
  deleteCampaign(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    // Hash password with bcrypt (salt rounds: 10)
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userWithHashedPassword = { ...user, password: hashedPassword };
    const [newUser] = await db.insert(users).values(userWithHashedPassword).returning();
    return newUser;
  }

  async updateUserPassword(id: number, hashedPassword: string): Promise<void> {
    await db.update(users).set({ password: hashedPassword }).where(eq(users.id, id));
  }

  async comparePassword(plainPassword: string, storedPassword: string, userId: number): Promise<boolean> {
    // Check if password is already hashed (bcrypt hashes start with $2)
    if (storedPassword.startsWith('$2')) {
      return await bcrypt.compare(plainPassword, storedPassword);
    } else {
      // Plaintext password - compare directly
      if (plainPassword === storedPassword) {
        // Hash the password and update the database
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        await this.updateUserPassword(userId, hashedPassword);
        return true;
      }
      return false;
    }
  }

  async getMembers(): Promise<Member[]> {
    return await db.select().from(members);
  }

  async getMemberByUserId(userId: number): Promise<Member | undefined> {
    if (!userId) return undefined;
    const [member] = await db.select().from(members).where(eq(members.userId, userId));
    return member;
  }

  async createMember(member: InsertMember): Promise<Member> {
    const [newMember] = await db.insert(members).values(member).returning();
    return newMember;
  }

  async updateMemberStatus(id: number, updateData: Partial<Member>): Promise<Member> {
    const [updated] = await db
      .update(members)
      .set(updateData)
      .where(eq(members.id, id))
      .returning();

    if (!updated) {
      throw new Error(`Member with id ${id} not found`);
    }

    return updated;
  }

  async createDonation(donation: InsertDonation): Promise<Donation> {
    const [newDonation] = await db.insert(donations).values(donation).returning();

    if (newDonation.memberId) {
      await db.update(members)
        .set({ eightyGCertificateGenerated: true })
        .where(eq(members.id, newDonation.memberId));
    }

    return newDonation;
  }

  async getDonations(): Promise<Donation[]> {
    return await db.select().from(donations);
  }

  async getCampaignsFrontend(): Promise<Campaign[]> {
    return await db.select().from(campaigns).where(eq(campaigns.status, "active")).orderBy(campaigns.createdAt);
  }

  async getCampaigns(): Promise<Campaign[]> {
    return await db.select().from(campaigns).orderBy(campaigns.createdAt);
  }

  async getCampaignById(id: number): Promise<Campaign | undefined> {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign;
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const [newCampaign] = await db.insert(campaigns).values(campaign).returning();
    return newCampaign;
  }

  async updateCampaign(id: number, data: Partial<InsertCampaign>): Promise<Campaign> {
    const [updated] = await db.update(campaigns).set(data).where(eq(campaigns.id, id)).returning();
    return updated;
  }

  async deleteCampaign(id: number): Promise<void> {
    await db.delete(campaigns).where(eq(campaigns.id, id));
  }
}

export const storage = new DatabaseStorage();
