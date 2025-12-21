import { NextRequest } from "next/server";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiNotFound,
  apiServerError,
} from "@/lib/utils";
import {
  publishProperty,
  unpublishProperty,
  isAdmin,
} from "@/lib/services";

type Params = Promise<{ id: string }>;

/**
 * POST /api/properties/[id]/publish
 * Publish a property (admin only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const { id } = await params;
    const result = await publishProperty(id);

    if (!result.success) {
      if (result.code === "NOT_FOUND") {
        return apiNotFound("Property");
      }
      return apiError(result.error, result.code === "VALIDATION_ERROR" ? 422 : 400);
    }

    return apiSuccess(result.data);
  } catch (error) {
    console.error("POST /api/properties/[id]/publish error:", error);
    return apiServerError();
  }
}

/**
 * DELETE /api/properties/[id]/publish
 * Unpublish a property (admin only)
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
    const result = await unpublishProperty(id);

    if (!result.success) {
      if (result.code === "NOT_FOUND") {
        return apiNotFound("Property");
      }
      return apiError(result.error);
    }

    return apiSuccess(result.data);
  } catch (error) {
    console.error("DELETE /api/properties/[id]/publish error:", error);
    return apiServerError();
  }
}
