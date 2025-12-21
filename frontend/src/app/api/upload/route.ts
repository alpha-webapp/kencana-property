import { NextRequest } from "next/server";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiServerError,
} from "@/lib/utils";
import {
  uploadAndSavePropertyImage,
  deletePropertyImageComplete,
  isAdmin,
} from "@/lib/services";

/**
 * POST /api/upload
 * Upload a property image (admin only)
 * 
 * FormData:
 * - file: File
 * - propertyId: string
 * - altText?: string
 * - sortOrder?: number
 */
export async function POST(request: NextRequest) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const propertyId = formData.get("propertyId") as string | null;
    const altText = formData.get("altText") as string | null;
    const sortOrder = formData.get("sortOrder") as string | null;

    if (!file) {
      return apiError("File diperlukan", 400);
    }

    if (!propertyId) {
      return apiError("Property ID diperlukan", 400);
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return apiError("Tipe file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF", 400);
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return apiError("Ukuran file maksimal 5MB", 400);
    }

    const result = await uploadAndSavePropertyImage(
      propertyId,
      file,
      altText || undefined,
      sortOrder ? parseInt(sortOrder) : undefined
    );

    if (!result.success) {
      return apiError(result.error);
    }

    return apiSuccess(result.data, 201);
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return apiServerError();
  }
}

/**
 * DELETE /api/upload
 * Delete a property image (admin only)
 * 
 * Body: { imageId: string }
 */
export async function DELETE(request: NextRequest) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const { imageId } = await request.json();

    if (!imageId) {
      return apiError("Image ID diperlukan", 400);
    }

    const result = await deletePropertyImageComplete(imageId);

    if (!result.success) {
      return apiError(result.error);
    }

    return apiSuccess({ message: "Image deleted" });
  } catch (error) {
    console.error("DELETE /api/upload error:", error);
    return apiServerError();
  }
}
