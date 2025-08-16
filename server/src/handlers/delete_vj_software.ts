import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { type DeleteVjSoftwareInput } from '../schema';

export async function deleteVjSoftware(input: DeleteVjSoftwareInput): Promise<boolean> {
  try {
    // Delete the VJ software entry by ID
    const result = await db.delete(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, input.id))
      .returning({ id: vjSoftwareTable.id })
      .execute();

    // Return true if a record was deleted, false if no record found
    return result.length > 0;
  } catch (error) {
    console.error('VJ Software deletion failed:', error);
    throw error;
  }
}