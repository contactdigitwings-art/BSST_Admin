import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users, members, donations,
  type User, type InsertUser,
  type Member, type InsertMember,
  type Donation, type InsertDonation
} from "@shared/schema";

export interface IStorage {
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getMembers(): Promise<Member[]>;
  getMemberByUserId(userId: number): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  updateMemberStatus(id: number, status: 'pending' | 'verified' | 'blocked'): Promise<Member>;
  
  getDonations(): Promise<Donation[]>;
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
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
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

  async updateMemberStatus(id: number, status: 'pending' | 'verified' | 'blocked'): Promise<Member> {
    // When a member is verified, automatically generate their documents
    const updateData: any = { status };
    if (status === 'verified') {
      updateData.idCardGenerated = true;
      updateData.appointmentLetterGenerated = true;
      updateData.certificateGenerated = true;
    }
    
    const [updated] = await db.update(members)
      .set(updateData)
      .where(eq(members.id, id))
      .returning();
    return updated;
  }

  async getDonations(): Promise<Donation[]> {
    return await db.select().from(donations);
  }
}

export const storage = new DatabaseStorage();
