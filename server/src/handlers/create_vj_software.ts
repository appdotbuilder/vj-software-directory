import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type CreateVjSoftwareInput, type VjSoftware } from '../schema';

export const createVjSoftware = async (input: CreateVjSoftwareInput): Promise<VjSoftware> => {
  try {
    // Insert VJ software record
    const result = await db.insert(vjSoftwareTable)
      .values({
        name: input.name,
        icon_url: input.icon_url,
        description: input.description,
        supported_os: input.supported_os,
        key_features: input.key_features,
        pricing_model: input.pricing_model,
        price_details: input.price_details,
        official_website: input.official_website,
        github_url: input.github_url,
        social_links: input.social_links
      })
      .returning()
      .execute();

    // Cast the result to match the VjSoftware schema type expectations
    const vjSoftware = result[0];
    return {
      ...vjSoftware,
      supported_os: vjSoftware.supported_os as ("Windows" | "macOS" | "Linux")[]
    };
  } catch (error) {
    console.error('VJ software creation failed:', error);
    throw error;
  }
};