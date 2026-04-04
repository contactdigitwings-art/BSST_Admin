// import * as dotenv from "dotenv";
// dotenv.config();

// import { db } from "./server/db";
// import { sql } from "drizzle-orm";

// async function runMigration() {
//   try {
//     console.log("Running migration: adding missing columns...");
    
//     // Add missing columns to donations table
//     await db.execute(sql`ALTER TABLE "donations" ADD COLUMN IF NOT EXISTS "reg_no" text`);
//     await db.execute(sql`ALTER TABLE "donations" ADD COLUMN IF NOT EXISTS "email" text`);
//     await db.execute(sql`ALTER TABLE "donations" ADD COLUMN IF NOT EXISTS "phone" text`);
//     await db.execute(sql`ALTER TABLE "donations" ADD COLUMN IF NOT EXISTS "project" text`);
//     await db.execute(sql`ALTER TABLE "donations" ADD COLUMN IF NOT EXISTS "campaign_id" integer`);
//     await db.execute(sql`ALTER TABLE "donations" ADD COLUMN IF NOT EXISTS "member_id" integer`);
//     await db.execute(sql`ALTER TABLE "donations" ADD COLUMN IF NOT EXISTS "pan_card_number" text`);
//     await db.execute(sql`ALTER TABLE "donations" ADD COLUMN IF NOT EXISTS "eighty_g_certificate_generated" boolean DEFAULT false`);

//     // Add foreign key constraints for donations table
//     try {
//       await db.execute(sql`ALTER TABLE "donations" ADD CONSTRAINT "donations_campaign_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
//     } catch (e) {
//       console.log("Campaign FK already exists or other constraint issue");
//     }

//     try {
//       await db.execute(sql`ALTER TABLE "donations" ADD CONSTRAINT "donations_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
//     } catch (e) {
//       console.log("Member FK already exists or other constraint issue");
//     }

//     // Add missing columns to members table
//     await db.execute(sql`ALTER TABLE "members" ADD COLUMN IF NOT EXISTS "user_id" integer`);
//     await db.execute(sql`ALTER TABLE "members" ADD COLUMN IF NOT EXISTS "is_80g_generated" boolean DEFAULT false`);

//     // Add foreign key constraint for members table
//     try {
//       await db.execute(sql`ALTER TABLE "members" ADD CONSTRAINT "members_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
//     } catch (e) {
//       console.log("User FK for members already exists or other constraint issue");
//     }

//     console.log("✅ Migration completed successfully!");
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Migration failed:", error);
//     process.exit(1);
//   }
// }

// runMigration();
