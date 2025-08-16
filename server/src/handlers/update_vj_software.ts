import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type UpdateVjSoftwareInput, type VjSoftware } from '../schema';
import { eq } from 'drizzle-orm';

export const updateVjSoftware = async (input: UpdateVjSoftwareInput): Promise<VjSoftware | null> => {
  try {
    // First, check if the software exists
    const existingSoftware = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, input.id))
      .execute();

    if (existingSoftware.length === 0) {
      return null;
    }

    // Build the update data object with only provided fields
    const updateData: any = {
      updated_at: new Date() // Always update the timestamp
    };

    // Add fields that were provided in the input
    if (input.name !== undefined) {
      updateData.name = input.name;
    }
    if (input.icon_url !== undefined) {
      updateData.icon_url = input.icon_url;
    }
    if (input.description !== undefined) {
      updateData.description = input.description;
    }
    if (input.supported_os !== undefined) {
      updateData.supported_os = input.supported_os;
    }
    if (input.key_features !== undefined) {
      updateData.key_features = input.key_features;
    }
    if (input.pricing_model !== undefined) {
      updateData.pricing_model = input.pricing_model;
    }
    if (input.price_details !== undefined) {
      updateData.price_details = input.price_details;
    }
    if (input.official_website !== undefined) {
      updateData.official_website = input.official_website;
    }
    if (input.github_url !== undefined) {
      updateData.github_url = input.github_url;
    }
    if (input.social_links !== undefined) {
      updateData.social_links = input.social_links;
    }

    // Update the software entry
    const result = await db.update(vjSoftwareTable)
      .set(updateData)
      .where(eq(vjSoftwareTable.id, input.id))
      .returning()
      .execute();

    // Convert the database result to match the schema types
    const updatedSoftware = result[0];
    return {
      ...updatedSoftware,
      supported_os: updatedSoftware.supported_os as ("Windows" | "macOS" | "Linux")[]
    };
  } catch (error) {
    console.error('VJ software update failed:', error);
    throw error;
  }
};