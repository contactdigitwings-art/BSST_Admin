import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // 'admin' or 'user'
  name: text("name").notNull(),
});

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  regNo: text("reg_no").default("member"), // Keep as required
  fullName: text("full_name").notNull(),
  position: text("position").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  gender: text("gender").notNull(), // 'Male' or 'Female'
  age: integer("age").notNull(),
  address: text("address").notNull(),
  projectArea: text("project_area").notNull(), // 'Education', 'Healthcare', 'Social Welfare', 'Other'
  date: text("date").notNull(), // Submission date
  status: text("status").notNull().default("pending"), // Keep as is: 'pending', 'verified', 'blocked'
  idCardGenerated: boolean("id_card_generated").default(false), // Keep as is
  appointmentLetterGenerated: boolean("appointment_letter_generated").default(false), // Keep as is
  eightyGCertificateGenerated: boolean("is_80g_generated").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  donorName: text("donor_name").notNull(),
  date: timestamp("date").defaultNow(),
  regNo: text("reg_no"),
  email: text("email"),
  phone: text("phone"),
  details: text("details"),
  campaignId: integer("campaign_id").references(() => campaigns.id),
  memberId: integer("member_id").references(() => members.id),
  paymentId: text("payment_id"),
  // SYNCED NAME HERE:
  panCardNumber: text("pan_card_number"), 
  eightyGCertificateGenerated: boolean("eighty_g_certificate_generated").default(false),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull().default("general"), // 'healthcare', 'education', 'welfare', 'general'
  goalAmount: integer("goal_amount").notNull(), // INR
  raisedAmount: integer("raised_amount").notNull().default(0), // INR
  status: text("status").notNull().default("active"), // 'active', 'completed', 'paused'
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertMemberSchema = createInsertSchema(members).omit({ id: true, createdAt: true });
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof members.$inferSelect;

export const insertDonationSchema = createInsertSchema(donations).omit({ id: true, date: true });
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;

export const insertCampaignSchema = createInsertSchema(campaigns).omit({ id: true, createdAt: true });
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;
