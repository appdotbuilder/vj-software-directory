import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type CreateVjSoftwareInput } from '../schema';
import { createVjSoftware } from '../handlers/create_vj_software';
import { eq } from 'drizzle-orm';

// Test input with all required fields
const testInput: CreateVjSoftwareInput = {
  name: 'Resolume Arena',
  icon_url: 'https://example.com/resolume-icon.png',
  description: 'Professional VJ software for real-time video mixing and effects',
  supported_os: ['Windows', 'macOS'],
  key_features: ['Real-time video mixing', 'Audio-reactive effects', 'MIDI control', '4K support'],
  pricing_model: 'Paid',
  price_details: '$699 one-time purchase',
  official_website: 'https://resolume.com',
  github_url: null,
  social_links: {
    youtube: 'https://youtube.com/resolume',
    twitter: 'https://twitter.com/resolume',
    instagram: null,
    facebook: null
  }
};

// Minimal test input
const minimalInput: CreateVjSoftwareInput = {
  name: 'Basic VJ Tool',
  icon_url: null,
  description: 'A simple VJ software',
  supported_os: ['Linux'],
  key_features: ['Basic mixing'],
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

describe('createVjSoftware', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a VJ software with all fields', async () => {
    const result = await createVjSoftware(testInput);

    // Basic field validation
    expect(result.name).toEqual('Resolume Arena');
    expect(result.icon_url).toEqual('https://example.com/resolume-icon.png');
    expect(result.description).toEqual('Professional VJ software for real-time video mixing and effects');
    expect(result.supported_os).toEqual(['Windows', 'macOS']);
    expect(result.key_features).toEqual(['Real-time video mixing', 'Audio-reactive effects', 'MIDI control', '4K support']);
    expect(result.pricing_model).toEqual('Paid');
    expect(result.price_details).toEqual('$699 one-time purchase');
    expect(result.official_website).toEqual('https://resolume.com');
    expect(result.github_url).toBeNull();
    expect(result.social_links).toEqual({
      youtube: 'https://youtube.com/resolume',
      twitter: 'https://twitter.com/resolume',
      instagram: null,
      facebook: null
    });
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should create a VJ software with minimal fields', async () => {
    const result = await createVjSoftware(minimalInput);

    expect(result.name).toEqual('Basic VJ Tool');
    expect(result.icon_url).toBeNull();
    expect(result.description).toEqual('A simple VJ software');
    expect(result.supported_os).toEqual(['Linux']);
    expect(result.key_features).toEqual(['Basic mixing']);
    expect(result.pricing_model).toEqual('Free');
    expect(result.price_details).toBeNull();
    expect(result.official_website).toBeNull();
    expect(result.github_url).toBeNull();
    expect(result.social_links).toEqual({
      youtube: null,
      twitter: null,
      instagram: null,
      facebook: null
    });
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save VJ software to database', async () => {
    const result = await createVjSoftware(testInput);

    // Query using proper drizzle syntax
    const vjSoftware = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, result.id))
      .execute();

    expect(vjSoftware).toHaveLength(1);
    expect(vjSoftware[0].name).toEqual('Resolume Arena');
    expect(vjSoftware[0].description).toEqual(testInput.description);
    expect(vjSoftware[0].supported_os).toEqual(['Windows', 'macOS']);
    expect(vjSoftware[0].key_features).toEqual(['Real-time video mixing', 'Audio-reactive effects', 'MIDI control', '4K support']);
    expect(vjSoftware[0].pricing_model).toEqual('Paid');
    expect(vjSoftware[0].social_links).toEqual({
      youtube: 'https://youtube.com/resolume',
      twitter: 'https://twitter.com/resolume',
      instagram: null,
      facebook: null
    });
    expect(vjSoftware[0].created_at).toBeInstanceOf(Date);
    expect(vjSoftware[0].updated_at).toBeInstanceOf(Date);
  });

  it('should handle different pricing models correctly', async () => {
    const subscriptionInput: CreateVjSoftwareInput = {
      ...minimalInput,
      name: 'Subscription VJ Tool',
      pricing_model: 'Subscription',
      price_details: '$19.99/month'
    };

    const result = await createVjSoftware(subscriptionInput);

    expect(result.pricing_model).toEqual('Subscription');
    expect(result.price_details).toEqual('$19.99/month');
  });

  it('should handle different operating systems correctly', async () => {
    const multiOsInput: CreateVjSoftwareInput = {
      ...minimalInput,
      name: 'Cross-Platform VJ Tool',
      supported_os: ['Windows', 'macOS', 'Linux']
    };

    const result = await createVjSoftware(multiOsInput);

    expect(result.supported_os).toEqual(['Windows', 'macOS', 'Linux']);
  });

  it('should handle complex social links correctly', async () => {
    const socialInput: CreateVjSoftwareInput = {
      ...minimalInput,
      name: 'Social VJ Tool',
      social_links: {
        youtube: 'https://youtube.com/socialvj',
        twitter: 'https://twitter.com/socialvj',
        instagram: 'https://instagram.com/socialvj',
        facebook: 'https://facebook.com/socialvj'
      }
    };

    const result = await createVjSoftware(socialInput);

    expect(result.social_links).toEqual({
      youtube: 'https://youtube.com/socialvj',
      twitter: 'https://twitter.com/socialvj',
      instagram: 'https://instagram.com/socialvj',
      facebook: 'https://facebook.com/socialvj'
    });
  });

  it('should create multiple VJ software entries independently', async () => {
    const result1 = await createVjSoftware(testInput);
    const result2 = await createVjSoftware(minimalInput);

    expect(result1.id).not.toEqual(result2.id);
    expect(result1.name).toEqual('Resolume Arena');
    expect(result2.name).toEqual('Basic VJ Tool');

    // Verify both exist in database
    const allSoftware = await db.select()
      .from(vjSoftwareTable)
      .execute();

    expect(allSoftware).toHaveLength(2);
  });
});