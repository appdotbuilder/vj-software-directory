import { z } from 'zod';

// Operating system enum
export const operatingSystemSchema = z.enum(['Windows', 'macOS', 'Linux']);
export type OperatingSystem = z.infer<typeof operatingSystemSchema>;

// Pricing model enum
export const pricingModelSchema = z.enum(['Free', 'Paid', 'Subscription', 'Freemium']);
export type PricingModel = z.infer<typeof pricingModelSchema>;

// Social media links schema
export const socialLinksSchema = z.object({
  youtube: z.string().url().nullable(),
  twitter: z.string().url().nullable(),
  instagram: z.string().url().nullable(),
  facebook: z.string().url().nullable()
});

export type SocialLinks = z.infer<typeof socialLinksSchema>;

// VJ Software schema
export const vjSoftwareSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon_url: z.string().url().nullable(),
  description: z.string(),
  supported_os: z.array(operatingSystemSchema),
  key_features: z.array(z.string()),
  pricing_model: pricingModelSchema,
  price_details: z.string().nullable(), // Additional pricing info like "$99 one-time" or "$9.99/month"
  official_website: z.string().url().nullable(),
  github_url: z.string().url().nullable(),
  social_links: socialLinksSchema,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type VjSoftware = z.infer<typeof vjSoftwareSchema>;

// Input schema for creating VJ software
export const createVjSoftwareInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon_url: z.string().url().nullable(),
  description: z.string().min(1, "Description is required"),
  supported_os: z.array(operatingSystemSchema).min(1, "At least one OS must be supported"),
  key_features: z.array(z.string().min(1)).min(1, "At least one key feature is required"),
  pricing_model: pricingModelSchema,
  price_details: z.string().nullable(),
  official_website: z.string().url().nullable(),
  github_url: z.string().url().nullable(),
  social_links: socialLinksSchema
});

export type CreateVjSoftwareInput = z.infer<typeof createVjSoftwareInputSchema>;

// Input schema for updating VJ software
export const updateVjSoftwareInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required").optional(),
  icon_url: z.string().url().nullable().optional(),
  description: z.string().min(1, "Description is required").optional(),
  supported_os: z.array(operatingSystemSchema).min(1, "At least one OS must be supported").optional(),
  key_features: z.array(z.string().min(1)).min(1, "At least one key feature is required").optional(),
  pricing_model: pricingModelSchema.optional(),
  price_details: z.string().nullable().optional(),
  official_website: z.string().url().nullable().optional(),
  github_url: z.string().url().nullable().optional(),
  social_links: socialLinksSchema.optional()
});

export type UpdateVjSoftwareInput = z.infer<typeof updateVjSoftwareInputSchema>;

// Search and filter input schema
export const searchVjSoftwareInputSchema = z.object({
  query: z.string().optional(), // Search by name or description
  supported_os: z.array(operatingSystemSchema).optional(), // Filter by OS
  pricing_model: z.array(pricingModelSchema).optional(), // Filter by pricing
  features: z.array(z.string()).optional() // Filter by specific features
});

export type SearchVjSoftwareInput = z.infer<typeof searchVjSoftwareInputSchema>;

// Delete VJ software input schema
export const deleteVjSoftwareInputSchema = z.object({
  id: z.number()
});

export type DeleteVjSoftwareInput = z.infer<typeof deleteVjSoftwareInputSchema>;

// Get single VJ software input schema
export const getVjSoftwareInputSchema = z.object({
  id: z.number()
});

export type GetVjSoftwareInput = z.infer<typeof getVjSoftwareInputSchema>;