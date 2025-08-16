import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type SearchVjSoftwareInput, type CreateVjSoftwareInput } from '../schema';
import { searchVjSoftware } from '../handlers/search_vj_software';

// Test data setup
const testSoftware1: CreateVjSoftwareInput = {
  name: 'TouchDesigner',
  icon_url: 'https://example.com/touchdesigner-icon.png',
  description: 'Real-time interactive media systems for VJ performances and installations',
  supported_os: ['Windows', 'macOS'],
  key_features: ['real-time', 'node-based', 'interactive', 'GLSL shaders'],
  pricing_model: 'Freemium',
  price_details: 'Free non-commercial, $600 commercial license',
  official_website: 'https://derivative.ca',
  github_url: null,
  social_links: {
    youtube: 'https://youtube.com/touchdesigner',
    twitter: 'https://twitter.com/touchdesigner',
    instagram: null,
    facebook: null
  }
};

const testSoftware2: CreateVjSoftwareInput = {
  name: 'Resolume Arena',
  icon_url: 'https://example.com/resolume-icon.png',
  description: 'Professional VJ software for live video mixing and projection mapping',
  supported_os: ['Windows', 'macOS'],
  key_features: ['video mixing', 'projection mapping', 'audio reactive', 'DMX control'],
  pricing_model: 'Paid',
  price_details: '$999 one-time purchase',
  official_website: 'https://resolume.com',
  github_url: null,
  social_links: {
    youtube: null,
    twitter: null,
    instagram: null,
    facebook: null
  }
};

const testSoftware3: CreateVjSoftwareInput = {
  name: 'VirtualDJ',
  icon_url: null,
  description: 'DJ software with basic video mixing capabilities',
  supported_os: ['Windows', 'macOS', 'Linux'],
  key_features: ['audio mixing', 'video mixing', 'controller support'],
  pricing_model: 'Subscription',
  price_details: '$19/month or $299 lifetime',
  official_website: 'https://virtualdj.com',
  github_url: null,
  social_links: {
    youtube: null,
    twitter: null,
    instagram: null,
    facebook: null
  }
};

// Helper function to create test data
async function createTestData() {
  const results = await Promise.all([
    db.insert(vjSoftwareTable).values(testSoftware1).returning().execute(),
    db.insert(vjSoftwareTable).values(testSoftware2).returning().execute(),
    db.insert(vjSoftwareTable).values(testSoftware3).returning().execute()
  ]);
  
  return {
    touchDesigner: results[0][0],
    resolume: results[1][0],
    virtualDJ: results[2][0]
  };
}

describe('searchVjSoftware', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return all software when no filters are applied', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({});
    
    expect(result).toHaveLength(3);
    expect(result.map(s => s.name).sort()).toEqual(['Resolume Arena', 'TouchDesigner', 'VirtualDJ']);
  });

  it('should search by name (case-insensitive)', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ query: 'touch' });
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('TouchDesigner');
  });

  it('should search by description content', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ query: 'projection mapping' });
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('Resolume Arena');
  });

  it('should filter by supported operating system', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ supported_os: ['Linux'] });
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('VirtualDJ');
  });

  it('should filter by multiple operating systems', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ supported_os: ['Windows', 'Linux'] });
    
    expect(result).toHaveLength(3); // All support Windows or Linux
    expect(result.map(s => s.name).sort()).toEqual(['Resolume Arena', 'TouchDesigner', 'VirtualDJ']);
  });

  it('should filter by pricing model', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ pricing_model: ['Paid'] });
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('Resolume Arena');
  });

  it('should filter by multiple pricing models', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ pricing_model: ['Paid', 'Freemium'] });
    
    expect(result).toHaveLength(2);
    expect(result.map(s => s.name).sort()).toEqual(['Resolume Arena', 'TouchDesigner']);
  });

  it('should filter by key features', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ features: ['projection mapping'] });
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('Resolume Arena');
  });

  it('should filter by multiple features', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ features: ['video mixing'] });
    
    expect(result).toHaveLength(2); // Resolume and VirtualDJ both have video mixing
    expect(result.map(s => s.name).sort()).toEqual(['Resolume Arena', 'VirtualDJ']);
  });

  it('should combine multiple filters', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({
      query: 'video',
      supported_os: ['Windows'],
      pricing_model: ['Paid', 'Subscription']
    });
    
    expect(result).toHaveLength(2); // Resolume and VirtualDJ match all criteria
    expect(result.map(s => s.name).sort()).toEqual(['Resolume Arena', 'VirtualDJ']);
  });

  it('should return empty array when no matches found', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ query: 'nonexistent software' });
    
    expect(result).toHaveLength(0);
  });

  it('should handle empty query string', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ query: '' });
    
    expect(result).toHaveLength(3); // Empty query should return all
  });

  it('should handle whitespace-only query', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ query: '   ' });
    
    expect(result).toHaveLength(3); // Whitespace-only query should return all
  });

  it('should return properly formatted dates', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({});
    
    expect(result.length).toBeGreaterThan(0);
    result.forEach(software => {
      expect(software.created_at).toBeInstanceOf(Date);
      expect(software.updated_at).toBeInstanceOf(Date);
    });
  });

  it('should handle complex feature matching', async () => {
    await createTestData();
    
    // Search for software that has either 'real-time' or 'audio mixing' features
    const result = await searchVjSoftware({ features: ['real-time', 'audio mixing'] });
    
    expect(result).toHaveLength(2); // TouchDesigner (real-time) and VirtualDJ (audio mixing)
    expect(result.map(s => s.name).sort()).toEqual(['TouchDesigner', 'VirtualDJ']);
  });

  it('should perform case-insensitive search across name and description', async () => {
    await createTestData();
    
    const result = await searchVjSoftware({ query: 'REAL-TIME' });
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('TouchDesigner');
  });
});