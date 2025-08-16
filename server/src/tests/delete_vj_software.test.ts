import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type CreateVjSoftwareInput, type DeleteVjSoftwareInput } from '../schema';
import { deleteVjSoftware } from '../handlers/delete_vj_software';
import { eq } from 'drizzle-orm';

// Test data for creating VJ software entries
const testVjSoftware: CreateVjSoftwareInput = {
  name: 'Test VJ Software',
  icon_url: 'https://example.com/icon.png',
  description: 'A test VJ software for testing deletion',
  supported_os: ['Windows', 'macOS'],
  key_features: ['Real-time effects', 'Audio reactive visuals'],
  pricing_model: 'Free',
  price_details: null,
  official_website: 'https://example.com',
  github_url: 'https://github.com/test/vj-software',
  social_links: {
    youtube: 'https://youtube.com/test',
    twitter: 'https://twitter.com/test',
    instagram: null,
    facebook: null
  }
};

const createTestVjSoftware = async (data: CreateVjSoftwareInput) => {
  const result = await db.insert(vjSoftwareTable)
    .values({
      name: data.name,
      icon_url: data.icon_url,
      description: data.description,
      supported_os: data.supported_os,
      key_features: data.key_features,
      pricing_model: data.pricing_model,
      price_details: data.price_details,
      official_website: data.official_website,
      github_url: data.github_url,
      social_links: data.social_links
    })
    .returning({ id: vjSoftwareTable.id })
    .execute();
  
  return result[0].id;
};

describe('deleteVjSoftware', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should delete an existing VJ software and return true', async () => {
    // Create a test VJ software entry
    const vjSoftwareId = await createTestVjSoftware(testVjSoftware);

    // Delete the VJ software
    const deleteInput: DeleteVjSoftwareInput = { id: vjSoftwareId };
    const result = await deleteVjSoftware(deleteInput);

    expect(result).toBe(true);

    // Verify the record was actually deleted from the database
    const deletedRecord = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, vjSoftwareId))
      .execute();

    expect(deletedRecord).toHaveLength(0);
  });

  it('should return false when trying to delete non-existent VJ software', async () => {
    const nonExistentId = 999999;
    const deleteInput: DeleteVjSoftwareInput = { id: nonExistentId };
    
    const result = await deleteVjSoftware(deleteInput);

    expect(result).toBe(false);
  });

  it('should not affect other VJ software entries when deleting one', async () => {
    // Create two test VJ software entries
    const vjSoftware1Id = await createTestVjSoftware(testVjSoftware);
    const vjSoftware2Id = await createTestVjSoftware({
      ...testVjSoftware,
      name: 'Another VJ Software',
      description: 'Another test VJ software'
    });

    // Delete only the first one
    const deleteInput: DeleteVjSoftwareInput = { id: vjSoftware1Id };
    const result = await deleteVjSoftware(deleteInput);

    expect(result).toBe(true);

    // Verify the first record was deleted
    const deletedRecord = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, vjSoftware1Id))
      .execute();

    expect(deletedRecord).toHaveLength(0);

    // Verify the second record still exists
    const remainingRecord = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, vjSoftware2Id))
      .execute();

    expect(remainingRecord).toHaveLength(1);
    expect(remainingRecord[0].name).toBe('Another VJ Software');
  });

  it('should handle deletion of VJ software with minimal data', async () => {
    // Create VJ software with minimal required fields
    const minimalVjSoftware: CreateVjSoftwareInput = {
      name: 'Minimal VJ Software',
      icon_url: null,
      description: 'Basic VJ software',
      supported_os: ['Linux'],
      key_features: ['Basic effects'],
      pricing_model: 'Free',
      price_details: null,
      official_website: null,
      github_url: null,
      social_links: {
        youtube: null,
        twitter: null,
        instagram: null,
        facebook: null
      }
    };

    const vjSoftwareId = await createTestVjSoftware(minimalVjSoftware);

    // Delete the minimal VJ software
    const deleteInput: DeleteVjSoftwareInput = { id: vjSoftwareId };
    const result = await deleteVjSoftware(deleteInput);

    expect(result).toBe(true);

    // Verify deletion
    const deletedRecord = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, vjSoftwareId))
      .execute();

    expect(deletedRecord).toHaveLength(0);
  });

  it('should handle multiple deletion attempts on the same ID', async () => {
    // Create a test VJ software entry
    const vjSoftwareId = await createTestVjSoftware(testVjSoftware);

    const deleteInput: DeleteVjSoftwareInput = { id: vjSoftwareId };

    // First deletion should succeed
    const firstResult = await deleteVjSoftware(deleteInput);
    expect(firstResult).toBe(true);

    // Second deletion attempt should return false (record already gone)
    const secondResult = await deleteVjSoftware(deleteInput);
    expect(secondResult).toBe(false);
  });
});