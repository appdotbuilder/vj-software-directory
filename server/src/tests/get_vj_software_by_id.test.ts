import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type GetVjSoftwareInput, type CreateVjSoftwareInput } from '../schema';
import { getVjSoftwareById } from '../handlers/get_vj_software_by_id';
import { eq } from 'drizzle-orm';

// Test data for creating VJ software
const testSoftwareData: CreateVjSoftwareInput = {
  name: 'Test VJ Software',
  icon_url: 'https://example.com/icon.png',
  description: 'A comprehensive VJ software for testing purposes',
  supported_os: ['Windows', 'macOS'],
  key_features: ['Real-time effects', 'MIDI support', 'Video mixing'],
  pricing_model: 'Paid',
  price_details: '$99 one-time purchase',
  official_website: 'https://testvj.com',
  github_url: 'https://github.com/test/vj-software',
  social_links: {
    youtube: 'https://youtube.com/testvj',
    twitter: 'https://twitter.com/testvj',
    instagram: null,
    facebook: null
  }
};

describe('getVjSoftwareById', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return VJ software when ID exists', async () => {
    // Create a test VJ software record
    const insertResult = await db.insert(vjSoftwareTable)
      .values({
        name: testSoftwareData.name,
        icon_url: testSoftwareData.icon_url,
        description: testSoftwareData.description,
        supported_os: testSoftwareData.supported_os,
        key_features: testSoftwareData.key_features,
        pricing_model: testSoftwareData.pricing_model,
        price_details: testSoftwareData.price_details,
        official_website: testSoftwareData.official_website,
        github_url: testSoftwareData.github_url,
        social_links: testSoftwareData.social_links
      })
      .returning()
      .execute();

    const createdSoftware = insertResult[0];

    // Test the handler
    const input: GetVjSoftwareInput = { id: createdSoftware.id };
    const result = await getVjSoftwareById(input);

    // Verify the result
    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdSoftware.id);
    expect(result!.name).toEqual('Test VJ Software');
    expect(result!.icon_url).toEqual('https://example.com/icon.png');
    expect(result!.description).toEqual('A comprehensive VJ software for testing purposes');
    expect(result!.supported_os).toEqual(['Windows', 'macOS']);
    expect(result!.key_features).toEqual(['Real-time effects', 'MIDI support', 'Video mixing']);
    expect(result!.pricing_model).toEqual('Paid');
    expect(result!.price_details).toEqual('$99 one-time purchase');
    expect(result!.official_website).toEqual('https://testvj.com');
    expect(result!.github_url).toEqual('https://github.com/test/vj-software');
    expect(result!.social_links).toEqual({
      youtube: 'https://youtube.com/testvj',
      twitter: 'https://twitter.com/testvj',
      instagram: null,
      facebook: null
    });
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return null when ID does not exist', async () => {
    const input: GetVjSoftwareInput = { id: 999999 };
    const result = await getVjSoftwareById(input);

    expect(result).toBeNull();
  });

  it('should handle VJ software with minimal data', async () => {
    // Create VJ software with only required fields
    const minimalData = {
      name: 'Minimal VJ Tool',
      icon_url: null,
      description: 'Basic VJ software',
      supported_os: ['Linux'],
      key_features: ['Basic effects'],
      pricing_model: 'Free' as const,
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

    const insertResult = await db.insert(vjSoftwareTable)
      .values(minimalData)
      .returning()
      .execute();

    const createdSoftware = insertResult[0];

    // Test the handler
    const input: GetVjSoftwareInput = { id: createdSoftware.id };
    const result = await getVjSoftwareById(input);

    // Verify the result
    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdSoftware.id);
    expect(result!.name).toEqual('Minimal VJ Tool');
    expect(result!.icon_url).toBeNull();
    expect(result!.description).toEqual('Basic VJ software');
    expect(result!.supported_os).toEqual(['Linux']);
    expect(result!.key_features).toEqual(['Basic effects']);
    expect(result!.pricing_model).toEqual('Free');
    expect(result!.price_details).toBeNull();
    expect(result!.official_website).toBeNull();
    expect(result!.github_url).toBeNull();
    expect(result!.social_links).toEqual({
      youtube: null,
      twitter: null,
      instagram: null,
      facebook: null
    });
  });

  it('should handle VJ software with all social links', async () => {
    // Create VJ software with all social links populated
    const fullSocialData = {
      name: 'Social VJ App',
      icon_url: 'https://example.com/social-icon.png',
      description: 'VJ software with full social presence',
      supported_os: ['Windows', 'macOS', 'Linux'],
      key_features: ['Advanced effects', 'Live streaming', 'Social integration'],
      pricing_model: 'Subscription' as const,
      price_details: '$19.99/month',
      official_website: 'https://socialvj.com',
      github_url: 'https://github.com/social/vj',
      social_links: {
        youtube: 'https://youtube.com/socialvj',
        twitter: 'https://twitter.com/socialvj',
        instagram: 'https://instagram.com/socialvj',
        facebook: 'https://facebook.com/socialvj'
      }
    };

    const insertResult = await db.insert(vjSoftwareTable)
      .values(fullSocialData)
      .returning()
      .execute();

    const createdSoftware = insertResult[0];

    // Test the handler
    const input: GetVjSoftwareInput = { id: createdSoftware.id };
    const result = await getVjSoftwareById(input);

    // Verify the result
    expect(result).not.toBeNull();
    expect(result!.supported_os).toEqual(['Windows', 'macOS', 'Linux']);
    expect(result!.key_features).toEqual(['Advanced effects', 'Live streaming', 'Social integration']);
    expect(result!.pricing_model).toEqual('Subscription');
    expect(result!.social_links).toEqual({
      youtube: 'https://youtube.com/socialvj',
      twitter: 'https://twitter.com/socialvj',
      instagram: 'https://instagram.com/socialvj',
      facebook: 'https://facebook.com/socialvj'
    });
  });

  it('should verify data persisted correctly in database', async () => {
    // Create test data
    const insertResult = await db.insert(vjSoftwareTable)
      .values({
        name: testSoftwareData.name,
        icon_url: testSoftwareData.icon_url,
        description: testSoftwareData.description,
        supported_os: testSoftwareData.supported_os,
        key_features: testSoftwareData.key_features,
        pricing_model: testSoftwareData.pricing_model,
        price_details: testSoftwareData.price_details,
        official_website: testSoftwareData.official_website,
        github_url: testSoftwareData.github_url,
        social_links: testSoftwareData.social_links
      })
      .returning()
      .execute();

    const createdId = insertResult[0].id;

    // Query directly from database to verify
    const dbResult = await db.select()
      .from(vjSoftwareTable)
      .where(eq(vjSoftwareTable.id, createdId))
      .execute();

    expect(dbResult).toHaveLength(1);
    const dbSoftware = dbResult[0];
    
    expect(dbSoftware.name).toEqual('Test VJ Software');
    expect(dbSoftware.supported_os).toEqual(['Windows', 'macOS']);
    expect(dbSoftware.key_features).toEqual(['Real-time effects', 'MIDI support', 'Video mixing']);
    expect(dbSoftware.pricing_model).toEqual('Paid');
    expect(dbSoftware.social_links).toEqual({
      youtube: 'https://youtube.com/testvj',
      twitter: 'https://twitter.com/testvj',
      instagram: null,
      facebook: null
    });

    // Now test the handler returns the same data
    const handlerResult = await getVjSoftwareById({ id: createdId });
    
    // Compare the key fields individually to handle type casting
    expect(handlerResult).not.toBeNull();
    expect(handlerResult!.id).toEqual(dbSoftware.id);
    expect(handlerResult!.name).toEqual(dbSoftware.name);
    expect(handlerResult!.supported_os).toEqual(dbSoftware.supported_os as ("Windows" | "macOS" | "Linux")[]);
    expect(handlerResult!.key_features).toEqual(dbSoftware.key_features);
    expect(handlerResult!.pricing_model).toEqual(dbSoftware.pricing_model);
    expect(handlerResult!.social_links).toEqual(dbSoftware.social_links);
  });
});