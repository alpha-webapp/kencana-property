import { createAdminClient } from "@/lib/supabase/server";
import { ok, err, type ServiceResult } from "@/lib/types";

/**
 * Storage Service
 *
 * Handles file upload/delete operations for property images.
 */

const BUCKET_NAME = "property-images";

/**
 * Upload a property image
 */
export async function uploadPropertyImage(
  propertyId: string,
  file: File
): Promise<ServiceResult<{ url: string; path: string }>> {
  const supabase = await createAdminClient();

  // Generate unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${propertyId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return err("Gagal mengupload gambar", "STORAGE_ERROR");
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  return ok({ url: publicUrl, path: fileName });
}

/**
 * Delete a property image
 */
export async function deletePropertyImage(
  path: string
): Promise<ServiceResult<void>> {
  const supabase = await createAdminClient();

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

  if (error) {
    console.error("Delete error:", error);
    return err("Gagal menghapus gambar", "STORAGE_ERROR");
  }

  return ok(undefined);
}

/**
 * Get public URL for an image path
 */
export function getPublicUrl(path: string): string {
  // This is a sync function - constructs URL without API call
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${path}`;
}

/**
 * Add image record to property_images table
 */
export async function addPropertyImageRecord(
  propertyId: string,
  url: string,
  storagePath: string,
  altText?: string,
  sortOrder?: number
): Promise<ServiceResult<{ id: string }>> {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("property_images")
    .insert({
      property_id: propertyId,
      url,
      storage_path: storagePath,
      alt_text: altText || null,
      sort_order: sortOrder || 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error adding image record:", error);
    return err("Gagal menyimpan data gambar", "DB_ERROR");
  }

  return ok({ id: data.id });
}

/**
 * Delete image record from property_images table
 */
export async function deletePropertyImageRecord(
  imageId: string
): Promise<ServiceResult<{ storagePath: string | null }>> {
  const supabase = await createAdminClient();

  // Get the storage path first
  const { data: image } = await supabase
    .from("property_images")
    .select("storage_path")
    .eq("id", imageId)
    .single();

  if (!image) {
    return err("Gambar tidak ditemukan", "NOT_FOUND");
  }

  // Delete the record
  const { error } = await supabase
    .from("property_images")
    .delete()
    .eq("id", imageId);

  if (error) {
    console.error("Error deleting image record:", error);
    return err("Gagal menghapus data gambar", "DB_ERROR");
  }

  return ok({ storagePath: image.storage_path });
}

/**
 * Upload and save property image (combines upload + record)
 */
export async function uploadAndSavePropertyImage(
  propertyId: string,
  file: File,
  altText?: string,
  sortOrder?: number
): Promise<ServiceResult<{ id: string; url: string }>> {
  // Upload to storage
  const uploadResult = await uploadPropertyImage(propertyId, file);
  if (!uploadResult.success) {
    return uploadResult;
  }

  // Save record to database
  const recordResult = await addPropertyImageRecord(
    propertyId,
    uploadResult.data.url,
    uploadResult.data.path,
    altText,
    sortOrder
  );

  if (!recordResult.success) {
    // Cleanup: delete uploaded file if record failed
    await deletePropertyImage(uploadResult.data.path);
    return recordResult;
  }

  return ok({ id: recordResult.data.id, url: uploadResult.data.url });
}

/**
 * Delete image completely (record + storage)
 */
export async function deletePropertyImageComplete(
  imageId: string
): Promise<ServiceResult<void>> {
  // Delete record and get storage path
  const recordResult = await deletePropertyImageRecord(imageId);
  if (!recordResult.success) {
    return err(recordResult.error, recordResult.code);
  }

  // Delete from storage if path exists
  if (recordResult.data.storagePath) {
    await deletePropertyImage(recordResult.data.storagePath);
  }

  return ok(undefined);
}
