import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type CreateVjSoftwareInput } from '../schema';
import { getAllVjSoftware } from '../handlers/get_all_vj_software';

// Test VJ software data
const testSoftware1: CreateVjSoftwareInput = {
  name: 'Resolume Avenue',
  icon_url: 'https://example.com/resolume-icon.png',
  description: 'Professional VJ software with advanced mapping and effects',
  supported_os: ['Windows', 'macOS'],
  key_features: ['Real-time video mixing', 'Audio reactive effects', 'Advanced mapping'],
  pricing_model: 'Paid',
  price_details: '$399 one-time purchase',
  official_website: 'https://resolume.com',
  github_url: null,
  social_links: {
    youtube: 'https://youtube.com/resolume',
    twitter: 'https://twitter.com/resolume',
    instagram: null,
    facebook: null
  }
};

const testSoftware2: CreateVjSoftwareInput = {
  name: 'TouchDesigner',
  icon_url: null,
  description: 'Node-based visual programming for real-time interactive multimedia',
  supported_os: ['Windows', 'macOS', 'Linux'],
  key_features: ['Node-based programming', 'Real-time rendering', '3D graphics'],
  pricing_model: 'Freemium',
  price_details: 'Free non-commercial, $600/year commercial',
  official_website: 'https://derivative.ca',
  github_url: null,
  social_links: {
    youtube: 'https://youtube.com/touchdesigner',
    twitter: null,
    instagram: null,
    facebook: 'https://facebook.com/touchdesigner'
  }
};

const testSoftware3: CreateVjSoftwareInput = {
  name: 'VDMX',
  icon_url: 'https://example.com/vdmx-icon.png',
  description: 'Modular VJ software for Mac with MIDI and OSC control',
  supported_os: ['macOS'],
  key_features: ['Modular interface', 'MIDI control', 'Live performance'],
  pricing_model: 'Paid',
  price_details: '$349 one-time purchase',
  official_website: 'https://vidvox.net',
  github_url: null,
  social_links: {
    youtube: null,
    twitter: 'https://twitter.com/vidvox',
    instagram: null,
    facebook: null
  }
};

describe('getAllVjSoftware', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no software exists', async () => {
    const result = await getAllVjSoftware();

    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return all VJ software ordered by name', async () => {
    // Insert test data
    await db.insert(vjSoftwareTable)
      .values([
        {
          ...testSoftware1,
          social_links: testSoftware1.social_links
        },
        {
          ...testSoftware2,
          social_links: testSoftware2.social_links
        },
        {
          ...testSoftware3,
          social_links: testSoftware3.social_links
        }
      ])
      .execute();

    const result = await getAllVjSoftware();

    expect(result).toHaveLength(3);
    
    // Should be ordered alphabetically by name
    expect(result[0].name).toEqual('Resolume Avenue');
    expect(result[1].name).toEqual('TouchDesigner');
    expect(result[2].name).toEqual('VDMX');

    // Verify all fields are present and correctly typed
    const firstSoftware = result[0];
    expect(firstSoftware.id).toBeDefined();
    expect(typeof firstSoftware.id).toBe('number');
    expect(firstSoftware.name).toEqual('Resolume Avenue');
    expect(firstSoftware.description).toEqual(testSoftware1.description);
    expect(firstSoftware.supported_os).toEqual(['Windows', 'macOS']);
    expect(firstSoftware.key_features).toEqual(['Real-time video mixing', 'Audio reactive effects', 'Advanced mapping']);
    expect(firstSoftware.pricing_model).toEqual('Paid');
    expect(firstSoftware.price_details).toEqual('$399 one-time purchase');
    expect(firstSoftware.official_website).toEqual('https://resolume.com');
    expect(firstSoftware.github_url).toBeNull();
    expect(firstSoftware.social_links).toEqual({
      youtube: 'https://youtube.com/resolume',
      twitter: 'https://twitter.com/resolume',
      instagram: null,
      facebook: null
    });
    expect(firstSoftware.created_at).toBeInstanceOf(Date);
    expect(firstSoftware.updated_at).toBeInstanceOf(Date);
  });

  it('should handle software with null optional fields', async () => {
    // Insert software with minimal data
    const minimalSoftware: CreateVjSoftwareInput = {
      name: 'Minimal VJ',
      icon_url: null,
      description: 'Basic VJ software',
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

    await db.insert(vjSoftwareTable)
      .values({
        ...minimalSoftware,
        social_links: minimalSoftware.social_links
      })
      .execute();

    const result = await getAllVjSoftware();

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('Minimal VJ');
    expect(result[0].icon_url).toBeNull();
    expect(result[0].price_details).toBeNull();
    expect(result[0].official_website).toBeNull();
    expect(result[0].github_url).toBeNull();
    expect(result[0].social_links.youtube).toBeNull();
  });

  it('should return software with different pricing models', async () => {
    // Create software with each pricing model
    const freeSoftware: CreateVjSoftwareInput = {
      name: 'Free VJ',
      icon_url: null,
      description: 'Free VJ software',
      supported_os: ['Windows'],
      key_features: ['Basic effects'],
      pricing_model: 'Free',
      price_details: null,
      official_website: null,
      github_url: null,
      social_links: { youtube: null, twitter: null, instagram: null, facebook: null }
    };

    const subscriptionSoftware: CreateVjSoftwareInput = {
      name: 'Sub VJ',
      icon_url: null,
      description: 'Subscription VJ software',
      supported_os: ['macOS'],
      key_features: ['Cloud sync'],
      pricing_model: 'Subscription',
      price_details: '$9.99/month',
      official_website: null,
      github_url: null,
      social_links: { youtube: null, twitter: null, instagram: null, facebook: null }
    };

    await db.insert(vjSoftwareTable)
      .values([
        { ...freeSoftware, social_links: freeSoftware.social_links },
        { ...subscriptionSoftware, social_links: subscriptionSoftware.social_links }
      ])
      .execute();

    const result = await getAllVjSoftware();

    expect(result).toHaveLength(2);
    
    // Find by name since order is alphabetical
    const freeSw = result.find(sw => sw.name === 'Free VJ');
    const subSw = result.find(sw => sw.name === 'Sub VJ');

    expect(freeSw?.pricing_model).toEqual('Free');
    expect(subSw?.pricing_model).toEqual('Subscription');
    expect(subSw?.price_details).toEqual('$9.99/month');
  });

  it('should preserve array data types correctly', async () => {
    await db.insert(vjSoftwareTable)
      .values({
        ...testSoftware1,
        social_links: testSoftware1.social_links
      })
      .execute();

    const result = await getAllVjSoftware();

    expect(result).toHaveLength(1);
    expect(Array.isArray(result[0].supported_os)).toBe(true);
    expect(Array.isArray(result[0].key_features)).toBe(true);
    expect(result[0].supported_os).toHaveLength(2);
    expect(result[0].key_features).toHaveLength(3);
    expect(result[0].supported_os).toContain('Windows');
    expect(result[0].supported_os).toContain('macOS');
  });
});