import { serial, text, pgTable, timestamp, pgEnum, json } from 'drizzle-orm/pg-core';

// Define enums for operating systems and pricing models
export const operatingSystemEnum = pgEnum('operating_system', ['Windows', 'macOS', 'Linux']);
export const pricingModelEnum = pgEnum('pricing_model', ['Free', 'Paid', 'Subscription', 'Freemium']);

export const vjSoftwareTable = pgTable('vj_software', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  icon_url: text('icon_url'), // Nullable by default
  description: text('description').notNull(),
  supported_os: json('supported_os').$type<string[]>().notNull(), // Array of OS strings
  key_features: json('key_features').$type<string[]>().notNull(), // Array of feature strings
  pricing_model: pricingModelEnum('pricing_model').notNull(),
  price_details: text('price_details'), // Nullable by default
  official_website: text('official_website'), // Nullable by default
  github_url: text('github_url'), // Nullable by default
  social_links: json('social_links').$type<{
    youtube: string | null;
    twitter: string | null;
    instagram: string | null;
    facebook: string | null;
  }>().notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type VjSoftware = typeof vjSoftwareTable.$inferSelect; // For SELECT operations
export type NewVjSoftware = typeof vjSoftwareTable.$inferInsert; // For INSERT operations

// Important: Export all tables for proper query building
export const tables = { vjSoftware: vjSoftwareTable };