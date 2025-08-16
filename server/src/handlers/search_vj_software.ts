import { db } from '../db';
import { vjSoftwareTable } from '../db/schema';
import { type SearchVjSoftwareInput, type VjSoftware } from '../schema';
import { and, or, ilike, sql, SQL, eq, inArray } from 'drizzle-orm';

export async function searchVjSoftware(input: SearchVjSoftwareInput): Promise<VjSoftware[]> {
  try {
    // Build conditions array for filtering
    const conditions: SQL<unknown>[] = [];

    // Text search in name and description
    if (input.query && input.query.trim()) {
      const searchTerm = `%${input.query.trim()}%`;
      conditions.push(
        or(
          ilike(vjSoftwareTable.name, searchTerm),
          ilike(vjSoftwareTable.description, searchTerm)
        )!
      );
    }

    // Filter by supported operating systems
    if (input.supported_os && input.supported_os.length > 0) {
      // Use PostgreSQL JSON array contains operator with JSON_ARRAY_ELEMENTS_TEXT
      const osConditions = input.supported_os.map(os => 
        sql`${os} = ANY(SELECT json_array_elements_text(${vjSoftwareTable.supported_os}))`
      );
      conditions.push(or(...osConditions)!);
    }

    // Filter by pricing model
    if (input.pricing_model && input.pricing_model.length > 0) {
      if (input.pricing_model.length === 1) {
        conditions.push(eq(vjSoftwareTable.pricing_model, input.pricing_model[0]));
      } else {
        conditions.push(inArray(vjSoftwareTable.pricing_model, input.pricing_model));
      }
    }

    // Filter by key features (partial match)
    if (input.features && input.features.length > 0) {
      // Use PostgreSQL JSON array contains operator with JSON_ARRAY_ELEMENTS_TEXT
      const featureConditions = input.features.map(feature => 
        sql`${feature} = ANY(SELECT json_array_elements_text(${vjSoftwareTable.key_features}))`
      );
      conditions.push(or(...featureConditions)!);
    }

    // Build final query with or without conditions
    const results = conditions.length > 0
      ? await db.select()
          .from(vjSoftwareTable)
          .where(conditions.length === 1 ? conditions[0] : and(...conditions))
          .execute()
      : await db.select()
          .from(vjSoftwareTable)
          .execute();
    
    return results.map(result => ({
      ...result,
      // Cast the JSON arrays to proper types
      supported_os: result.supported_os as ('Windows' | 'macOS' | 'Linux')[],
      key_features: result.key_features as string[],
      // Ensure dates are properly converted
      created_at: new Date(result.created_at),
      updated_at: new Date(result.updated_at)
    }));
  } catch (error) {
    console.error('VJ software search failed:', error);
    throw error;
  }
}