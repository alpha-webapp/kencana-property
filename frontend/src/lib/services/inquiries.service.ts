import { createClient, createAdminClient } from "@/lib/supabase/server";
import { ok, err, type ServiceResult } from "@/lib/types";
import {
  submitInquirySchema,
  updateInquiryStatusSchema,
  type SubmitInquiryInput,
  type UpdateInquiryStatusInput,
} from "@/lib/validators";
import type { Inquiry, InquiryInsert } from "@/lib/supabase/types";

/**
 * Inquiry Service
 *
 * Handles all inquiry-related business logic.
 */

/**
 * Submit a new inquiry (public - from contact form)
 */
export async function submitInquiry(
  input: SubmitInquiryInput
): Promise<ServiceResult<Inquiry>> {
  // Validate input
  const parsed = submitInquirySchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return err(firstError.message, "VALIDATION_ERROR");
  }

  // Use regular client (respects RLS - public can insert)
  const supabase = await createClient();

  const insertData: InquiryInsert = {
    type: parsed.data.type,
    subject: parsed.data.subject || null,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    message: parsed.data.message,
    property_id: parsed.data.property_id || null,
  };

  const { data, error } = await supabase
    .from("inquiries")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error("Error submitting inquiry:", error);
    return err("Gagal mengirim pesan", "DB_ERROR");
  }

  return ok(data);
}

/**
 * Get all inquiries (admin only)
 */
export async function getInquiries(options?: {
  status?: "new" | "read" | "replied" | "closed";
  limit?: number;
}): Promise<ServiceResult<Inquiry[]>> {
  const supabase = await createAdminClient();

  let query = supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching inquiries:", error);
    return err("Gagal mengambil data pesan", "DB_ERROR");
  }

  return ok(data);
}

/**
 * Get inquiry by ID (admin only)
 */
export async function getInquiryById(id: string): Promise<ServiceResult<Inquiry>> {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return err("Pesan tidak ditemukan", "NOT_FOUND");
  }

  return ok(data);
}

/**
 * Update inquiry status (admin only)
 */
export async function updateInquiryStatus(
  id: string,
  input: UpdateInquiryStatusInput
): Promise<ServiceResult<Inquiry>> {
  // Validate input
  const parsed = updateInquiryStatusSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return err(firstError.message, "VALIDATION_ERROR");
  }

  const supabase = await createAdminClient();

  // Build update data with timestamps
  const updateData: Record<string, unknown> = {
    status: parsed.data.status,
  };

  if (parsed.data.notes !== undefined) {
    updateData.notes = parsed.data.notes;
  }

  // Set timestamp based on status
  if (parsed.data.status === "read") {
    updateData.read_at = new Date().toISOString();
  } else if (parsed.data.status === "replied") {
    updateData.replied_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("inquiries")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating inquiry:", error);
    return err("Gagal mengupdate status pesan", "DB_ERROR");
  }

  return ok(data);
}

/**
 * Mark inquiry as read
 */
export async function markInquiryAsRead(id: string): Promise<ServiceResult<Inquiry>> {
  return updateInquiryStatus(id, { status: "read" });
}

/**
 * Mark inquiry as replied
 */
export async function markInquiryAsReplied(id: string): Promise<ServiceResult<Inquiry>> {
  return updateInquiryStatus(id, { status: "replied" });
}

/**
 * Close inquiry
 */
export async function closeInquiry(id: string): Promise<ServiceResult<Inquiry>> {
  return updateInquiryStatus(id, { status: "closed" });
}

/**
 * Get inquiry counts by status (for dashboard)
 */
export async function getInquiryCounts(): Promise<
  ServiceResult<{ new: number; read: number; replied: number; closed: number; total: number }>
> {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.from("inquiries").select("status");

  if (error) {
    console.error("Error fetching inquiry counts:", error);
    return err("Gagal mengambil data statistik", "DB_ERROR");
  }

  const counts = {
    new: 0,
    read: 0,
    replied: 0,
    closed: 0,
    total: data.length,
  };

  data.forEach((item) => {
    if (item.status in counts) {
      counts[item.status as keyof typeof counts]++;
    }
  });

  return ok(counts);
}
