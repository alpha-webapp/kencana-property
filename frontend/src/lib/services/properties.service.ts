import { createClient, createAdminClient } from "@/lib/supabase/server";
import { ok, err, type ServiceResult } from "@/lib/types";
import {
  createPropertySchema,
  updatePropertySchema,
  type CreatePropertyInput,
  type UpdatePropertyInput,
} from "@/lib/validators";
import type { Property, PropertyInsert, PropertyUpdate } from "@/lib/supabase/types";

/**
 * Property Service
 *
 * Handles all property-related business logic.
 * Uses admin client for write operations (bypasses RLS).
 */

/**
 * Create a new property
 */
export async function createProperty(
  input: CreatePropertyInput
): Promise<ServiceResult<Property>> {
  // Validate input
  const parsed = createPropertySchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return err(firstError.message, "VALIDATION_ERROR");
  }

  const supabase = await createAdminClient();

  // Generate slug from title
  const slug = generateSlug(parsed.data.title);

  const insertData: PropertyInsert = {
    ...parsed.data,
    slug,
    features: parsed.data.features || [],
  };

  const { data, error } = await supabase
    .from("properties")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error("Error creating property:", error);
    return err("Gagal membuat properti", "DB_ERROR");
  }

  return ok(data);
}

/**
 * Update an existing property
 */
export async function updateProperty(
  id: string,
  input: UpdatePropertyInput
): Promise<ServiceResult<Property>> {
  // Validate input
  const parsed = updatePropertySchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return err(firstError.message, "VALIDATION_ERROR");
  }

  const supabase = await createAdminClient();

  // Check if property exists
  const { data: existing } = await supabase
    .from("properties")
    .select("id")
    .eq("id", id)
    .single();

  if (!existing) {
    return err("Properti tidak ditemukan", "NOT_FOUND");
  }

  // Update slug if title changed
  const updateData: PropertyUpdate = { ...parsed.data };
  if (parsed.data.title) {
    updateData.slug = generateSlug(parsed.data.title);
  }

  const { data, error } = await supabase
    .from("properties")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating property:", error);
    return err("Gagal mengupdate properti", "DB_ERROR");
  }

  return ok(data);
}

/**
 * Delete a property (soft delete - sets status to archived)
 */
export async function deleteProperty(id: string): Promise<ServiceResult<void>> {
  const supabase = await createAdminClient();

  const { error } = await supabase
    .from("properties")
    .update({ status: "archived" })
    .eq("id", id);

  if (error) {
    console.error("Error deleting property:", error);
    return err("Gagal menghapus properti", "DB_ERROR");
  }

  return ok(undefined);
}

/**
 * Publish a property
 */
export async function publishProperty(id: string): Promise<ServiceResult<Property>> {
  const supabase = await createAdminClient();

  // Check property has required fields for publishing
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (!property) {
    return err("Properti tidak ditemukan", "NOT_FOUND");
  }

  if (!property.featured_image) {
    return err("Properti harus memiliki gambar utama untuk dipublikasi", "VALIDATION_ERROR");
  }

  const { data, error } = await supabase
    .from("properties")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error publishing property:", error);
    return err("Gagal mempublikasi properti", "DB_ERROR");
  }

  return ok(data);
}

/**
 * Unpublish a property (set back to draft)
 */
export async function unpublishProperty(id: string): Promise<ServiceResult<Property>> {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("properties")
    .update({
      status: "draft",
      published_at: null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error unpublishing property:", error);
    return err("Gagal membatalkan publikasi properti", "DB_ERROR");
  }

  return ok(data);
}

/**
 * Get all properties (admin view - includes drafts)
 */
export async function getAllProperties(): Promise<ServiceResult<Property[]>> {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .neq("status", "archived")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error);
    return err("Gagal mengambil data properti", "DB_ERROR");
  }

  return ok(data);
}

/**
 * Get property by ID (admin view)
 */
export async function getPropertyById(id: string): Promise<ServiceResult<Property>> {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return err("Properti tidak ditemukan", "NOT_FOUND");
  }

  return ok(data);
}

/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title: string): string {
  const timestamp = Date.now().toString(36);
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  return `${slug}-${timestamp}`;
}
