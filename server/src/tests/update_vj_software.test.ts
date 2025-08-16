import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type UpdateVjSoftwareInput, type CreateVjSoftwareInput } from '../schema';
import { updateVjSoftware } from '../handlers/update_vj_software';
import { eq } from 'drizzle-orm';

// Test data for creating initial VJ software
const testVjSoftware: CreateVjSoftwareInput = {
  name: 'Test VJ Software',
  icon_url: 'https://example.com/icon.png',
  description: 'A software for testing VJ functionality',
  supported_os: ['Windows', 'macOS'],
  key_features: ['Real-time rendering', 'MIDI support'],
  pricing_model: 'Paid',
  price_details: '$99 one-time',
  official_website: 'https://example.com',
  github_url: 'https://github.com/example/vj-software',
  social_links: {
    youtube: 'https://youtube.com/example',
    twitter: 'https://twitter.com/example',
    instagram: null,
    facebook: null
  }
};

describe('updateVjSoftware', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  let createdSoftwareId: number;

  beforeEach(async () => {
    // Create a test VJ software entry for each test
    const result = await db.insert(vjSoftwareTable)
      .values({
        ...testVjSoftware,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning()
      .execute();
    
    createdSoftwareId = result[0].id;
  });

  it('should update basic fields successfully', async () => {
    const updateInput: UpdateVjSoftwareInput = {
      id: createdSoftwareId,
      name: 'Updated VJ Software',
      description: 'Updated description for testing'
    };

    const result = await updateVjSoftware(updateInput);

    expect(result).toBeDefined();
    expect(result!.id).toEqual(createdSoftwareId);
    expect(result!.name).toEqual('Updated VJ Software');
    expect(result!.description).toEqual('Updated description for testing');
    expect(result!.pricing_model).toEqual('Paid'); // Should remain unchanged
    expect(result!.supported_os).toEqual(['Windows', 'macOS']); // Should remain unchanged
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should update array fields correctly', async () => {
    const updateInput: UpdateVjSoftwareInput = {
      id: createdSoftwareId,
      supported_os: ['Linux'],
      key_features: ['Audio visualization', 'DMX control', 'Live streaming']
    };

    const result = await updateVjSoftware(updateInput);

    expect(result).toBeDefined();
    expect(result!.supported_os).toEqual(['Linux']);
    expect(result!.key_features).toEqual(['Audio visualization', 'DMX control', 'Live streaming']);
    expect(result!.name).toEqual('Test VJ Software'); // Should remain unchanged
  });

  it('should update pricing information', async () => {
    const updateInput: UpdateVjSoftwareInput = {
      id: createdSoftwareId,
      pricing_model: 'Subscription',
      price_details: '$19.99/month'
    };

    const result = await updateVjSoftware(updateInput);

    expect(result).toBeDefined();
    expect(result!.pricing_model).toEqual('Subscription');
    expect(result!.price_details).toEqual('$19.99/month');
  });

  it('should update URLs and social links', async () => {
    const updateInput: UpdateVjSoftwareInput = {
      id: createdSoftwareId,
      icon_url: 'https://newsite.com/new-icon.svg',
      official_website: 'https://newsite.com',
      github_url: 'https://github.com/newuser/new-vj-software',
      social_links: {
        youtube: 'https://youtube.com/newchannel',
        twitter: null,
        instagram: 'https://instagram.com/newaccount',
        facebook: 'https://facebook.com/newpage'
      }
    };

    const result = await updateVjSoftware(updateInput);

    expect(result).toBeDefined();
    expect(result!.icon_url).toEqual('https://newsite.com/new-icon.svg');
    expect(result!.official_website).toEqual('https://newsite.com');
    expect(result!.github_url).toEqual('https://github.com/newuser/new-vj-software');
    expect(result!.social_links.youtube).toEqual('https://youtube.com/newchannel');
    expect(result!.social_links.twitter).toBeNull();
    expect(result!.social_links.instagram).toEqual('https://instagram.com/newaccount');
    expect(result!.social_links.facebook).toEqual('https://facebook.com/newpage');
  });

  it('should update nullable fields to null', async () => {
    const updateInput: UpdateVjSoftwareInput = {
      id: createdSoftwareId,
      icon_url: null,
      price_details: null,
      official_website: null,
      github_url: null
    };

    const result = await updateVjSoftware(updateInput);

    expect(result).toBeDefined();
    expect(result!.icon_url).toBeNull();
    expect(result!.price_details).toBeNull();
    expect(result!.official_website).toBeNull();
    expect(result!.github_url).toBeNull();
  });

  it('should update the updated_at timestamp', async () => {
    // Get original timestamp
    const originalSoftware = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, createdSoftwareId))
      .execute();

    const originalUpdatedAt = originalSoftware[0].updated_at;

    // Wait a moment to ensure timestamp difference
    await new Promise(resolve => setTimeout(resolve, 10));

    const updateInput: UpdateVjSoftwareInput = {
      id: createdSoftwareId,
      name: 'Updated Name'
    };

    const result = await updateVjSoftware(updateInput);

    expect(result).toBeDefined();
    expect(result!.updated_at).toBeInstanceOf(Date);
    expect(result!.updated_at.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    expect(result!.created_at).toEqual(originalSoftware[0].created_at); // Should remain unchanged
  });

  it('should persist changes in database', async () => {
    const updateInput: UpdateVjSoftwareInput = {
      id: createdSoftwareId,
      name: 'Database Test Update',
      pricing_model: 'Free'
    };

    await updateVjSoftware(updateInput);

    // Verify changes persisted in database
    const updatedSoftware = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, createdSoftwareId))
      .execute();

    expect(updatedSoftware).toHaveLength(1);
    expect(updatedSoftware[0].name).toEqual('Database Test Update');
    expect(updatedSoftware[0].pricing_model).toEqual('Free');
  });

  it('should return null for non-existent software', async () => {
    const updateInput: UpdateVjSoftwareInput = {
      id: 99999, // Non-existent ID
      name: 'This should not work'
    };

    const result = await updateVjSoftware(updateInput);

    expect(result).toBeNull();
  });

  it('should handle partial updates without affecting other fields', async () => {
    // Update only one field
    const updateInput: UpdateVjSoftwareInput = {
      id: createdSoftwareId,
      description: 'Only description changed'
    };

    const result = await updateVjSoftware(updateInput);

    expect(result).toBeDefined();
    expect(result!.description).toEqual('Only description changed');
    
    // Verify all other fields remain unchanged
    expect(result!.name).toEqual('Test VJ Software');
    expect(result!.pricing_model).toEqual('Paid');
    expect(result!.supported_os).toEqual(['Windows', 'macOS']);
    expect(result!.key_features).toEqual(['Real-time rendering', 'MIDI support']);
    expect(result!.official_website).toEqual('https://example.com');
  });

  it('should handle empty update gracefully', async () => {
    const updateInput: UpdateVjSoftwareInput = {
      id: createdSoftwareId
      // No fields to update except the implicit updated_at
    };

    const result = await updateVjSoftware(updateInput);

    expect(result).toBeDefined();
    expect(result!.id).toEqual(createdSoftwareId);
    expect(result!.updated_at).toBeInstanceOf(Date);
    
    // All other fields should remain unchanged
    expect(result!.name).toEqual('Test VJ Software');
    expect(result!.description).toEqual('A software for testing VJ functionality');
  });
});