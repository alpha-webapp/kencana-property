import { NextRequest } from "next/server";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiNotFound,
  apiServerError,
} from "@/lib/utils";
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
  isAdmin,
} from "@/lib/services";
import type { UpdatePropertyInput } from "@/lib/validators";

type Params = Promise<{ id: string }>;

/**
 * GET /api/properties/[id]
 * Get a single property by ID (admin view)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const { id } = await params;
    const result = await getPropertyById(id);

    if (!result.success) {
      if (result.code === "NOT_FOUND") {
        return apiNotFound("Property");
      }
      return apiError(result.error);
    }

    return apiSuccess(result.data);
  } catch (error) {
    console.error("GET /api/properties/[id] error:", error);
    return apiServerError();
  }
}

/**
 * PUT /api/properties/[id]
 * Update a property (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const { id } = await params;
    const body = (await request.json()) as UpdatePropertyInput;
    const result = await updateProperty(id, body);

    if (!result.success) {
      if (result.code === "NOT_FOUND") {
        return apiNotFound("Property");
      }
      return apiError(result.error, result.code === "VALIDATION_ERROR" ? 422 : 400);
    }

    return apiSuccess(result.data);
  } catch (error) {
    console.error("PUT /api/properties/[id] error:", error);
    return apiServerError();
  }
}

/**
 * DELETE /api/properties/[id]
 * Delete a property (soft delete - admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const { id } = await params;
    const result = await deleteProperty(id);

    if (!result.success) {
      return apiError(result.error);
    }

    return apiSuccess({ message: "Property deleted" });
  } catch (error) {
    console.error("DELETE /api/properties/[id] error:", error);
    return apiServerError();
  }
}
