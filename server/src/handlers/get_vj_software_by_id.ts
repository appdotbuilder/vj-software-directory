import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type GetVjSoftwareInput, type VjSoftware } from '../schema';
import { eq } from 'drizzle-orm';

export async function getVjSoftwareById(input: GetVjSoftwareInput): Promise<VjSoftware | null> {
  try {
    // Query the database for the specific VJ software by ID
    const result = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, input.id))
      .execute();

    // Return null if no record found
    if (result.length === 0) {
      return null;
    }

    // Return the found VJ software record
    const software = result[0];
    return {
      id: software.id,
      name: software.name,
      icon_url: software.icon_url,
      description: software.description,
      supported_os: software.supported_os as ("Windows" | "macOS" | "Linux")[],
      key_features: software.key_features,
      pricing_model: software.pricing_model,
      price_details: software.price_details,
      official_website: software.official_website,
      github_url: software.github_url,
      social_links: software.social_links,
      created_at: software.created_at,
      updated_at: software.updated_at
    };
  } catch (error) {
    console.error('Failed to get VJ software by ID:', error);
    throw error;
  }
}