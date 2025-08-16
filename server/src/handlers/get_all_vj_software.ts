import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type VjSoftware } from '../schema';
import { asc } from 'drizzle-orm';

export const getAllVjSoftware = async (): Promise<VjSoftware[]> => {
  try {
    // Fetch all VJ software entries ordered by name
    const results = await db.select()
      .from(vjSoftwareTable)
      .orderBy(asc(vjSoftwareTable.name))
      .execute();

    // Cast results to match the expected schema type (JSON columns lose strict typing)
    return results as VjSoftware[];
  } catch (error) {
    console.error('Failed to fetch VJ software:', error);
    throw error;
  }
};