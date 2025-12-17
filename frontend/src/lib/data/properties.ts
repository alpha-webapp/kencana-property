import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

// Database row type
type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];

// Transformed property type for frontend components
export interface Property {
  id: string;
  slug: string;
  title: string;
  price: number;
  priceLabel: string | null;
  location: string; // sub_district
  district: string;
  imageUrl: string;
  propertyType: string;
  transactionType: "dijual" | "disewa";
  bedrooms: number | null;
  bathrooms: number | null;
  landSize: number | null;
  buildingSize: number | null;
}

// Query options for filtering
export interface PropertyQueryOptions {
  transactionType?: "dijual" | "disewa";
  propertyType?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sortBy?: "newest" | "price-asc" | "price-desc";
  limit?: number;
  offset?: number;
}

/**
 * Transform database row to frontend property format
 */
function transformProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    price: row.price,
    priceLabel: row.price_label,
    location: row.sub_district || row.district,
    district: row.district,
    imageUrl: row.featured_image || "/placeholder-property.jpg",
    propertyType: row.property_type.charAt(0).toUpperCase() + row.property_type.slice(1),
    transactionType: row.transaction_type,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    landSize: row.land_size,
    buildingSize: row.building_size,
  };
}

/**
 * Fetch published properties with optional filters
 */
export async function getProperties(
  options: PropertyQueryOptions = {}
): Promise<Property[]> {
  const supabase = await createClient();

  // Determine sort order
  let orderColumn = "created_at";
  let ascending = false;
  if (options.sortBy === "price-asc") {
    orderColumn = "price";
    ascending = true;
  } else if (options.sortBy === "price-desc") {
    orderColumn = "price";
    ascending = false;
  }

  let query = supabase
    .from("properties")
    .select("*")
    .eq("status", "published")
    .order(orderColumn, { ascending });

  // Apply filters
  if (options.transactionType) {
    query = query.eq("transaction_type", options.transactionType);
  }
  if (options.propertyType) {
    query = query.eq("property_type", options.propertyType.toLowerCase());
  }
  if (options.district) {
    query = query.eq("district", options.district);
  }
  if (options.minPrice) {
    query = query.gte("price", options.minPrice);
  }
  if (options.maxPrice) {
    query = query.lte("price", options.maxPrice);
  }
  if (options.bedrooms) {
    query = query.gte("bedrooms", options.bedrooms);
  }
  if (options.bathrooms) {
    query = query.gte("bathrooms", options.bathrooms);
  }
  if (options.limit) {
    query = query.limit(options.limit);
  }
  if (options.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching properties:", error);
    return [];
  }

  return data.map(transformProperty);
}

/**
 * Fetch featured properties (latest published)
 */
export async function getFeaturedProperties(limit = 8): Promise<Property[]> {
  return getProperties({ limit });
}

/**
 * Fetch a single property by slug
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    console.error("Error fetching property:", error);
    return null;
  }

  return transformProperty(data);
}

/**
 * Fetch a single property by ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !data) {
    console.error("Error fetching property:", error);
    return null;
  }

  return transformProperty(data);
}

// Extended property type for detail page
export interface PropertyDetail extends Property {
  description: string | null;
  address: string;
  province: string;
  floors: number | null;
  certificate: string | null;
  electricity: number | null;
  furnished: "furnished" | "semi-furnished" | "unfurnished" | null;
  facing: string | null;
  yearBuilt: number | null;
  features: string[];
  images: string[];
  createdAt: string;
}

/**
 * Transform database row to PropertyDetail format
 */
function transformPropertyDetail(
  row: PropertyRow,
  images: string[]
): PropertyDetail {
  const features = Array.isArray(row.features) 
    ? (row.features as string[]) 
    : [];

  return {
    // Base Property fields
    id: row.id,
    slug: row.slug,
    title: row.title,
    price: row.price,
    priceLabel: row.price_label,
    location: row.sub_district || row.district,
    district: row.district,
    imageUrl: row.featured_image || images[0] || "/placeholder-property.jpg",
    propertyType: row.property_type.charAt(0).toUpperCase() + row.property_type.slice(1),
    transactionType: row.transaction_type,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    landSize: row.land_size,
    buildingSize: row.building_size,
    // Extended fields
    description: row.description,
    address: row.address,
    province: row.province,
    floors: row.floors,
    certificate: row.certificate?.toUpperCase() || null,
    electricity: row.electricity,
    furnished: row.furnished,
    facing: row.facing,
    yearBuilt: row.year_built,
    features,
    images: images.length > 0 ? images : (row.featured_image ? [row.featured_image] : []),
    createdAt: row.created_at,
  };
}

/**
 * Fetch detailed property by slug (for detail page)
 */
export async function getPropertyDetailBySlug(
  slug: string
): Promise<PropertyDetail | null> {
  const supabase = await createClient();

  // Fetch property
  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !property) {
    console.error("Error fetching property:", error);
    return null;
  }

  // Fetch images
  const { data: images } = await supabase
    .from("property_images")
    .select("url")
    .eq("property_id", property.id)
    .order("sort_order", { ascending: true });

  const imageUrls = images?.map((img) => img.url) || [];

  return transformPropertyDetail(property, imageUrls);
}

/**
 * Fetch similar properties (same type, different ID)
 */
export async function getSimilarProperties(
  excludeId: string,
  propertyType: string,
  limit = 3
): Promise<Property[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "published")
    .eq("property_type", propertyType.toLowerCase())
    .neq("id", excludeId)
    .limit(limit);

  if (error) {
    console.error("Error fetching similar properties:", error);
    return [];
  }

  return data.map(transformProperty);
}

