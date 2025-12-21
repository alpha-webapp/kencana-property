import { NextRequest } from "next/server";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiNotFound,
  apiServerError,
} from "@/lib/utils";
import {
  getInquiryById,
  updateInquiryStatus,
  isAdmin,
} from "@/lib/services";
import type { UpdateInquiryStatusInput } from "@/lib/validators";

type Params = Promise<{ id: string }>;

/**
 * GET /api/inquiries/[id]
 * Get a single inquiry by ID (admin only)
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
    const result = await getInquiryById(id);

    if (!result.success) {
      if (result.code === "NOT_FOUND") {
        return apiNotFound("Inquiry");
      }
      return apiError(result.error);
    }

    return apiSuccess(result.data);
  } catch (error) {
    console.error("GET /api/inquiries/[id] error:", error);
    return apiServerError();
  }
}

/**
 * PATCH /api/inquiries/[id]
 * Update inquiry status (admin only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const { id } = await params;
    const body = (await request.json()) as UpdateInquiryStatusInput;
    const result = await updateInquiryStatus(id, body);

    if (!result.success) {
      if (result.code === "NOT_FOUND") {
        return apiNotFound("Inquiry");
      }
      return apiError(result.error, result.code === "VALIDATION_ERROR" ? 422 : 400);
    }

    return apiSuccess(result.data);
  } catch (error) {
    console.error("PATCH /api/inquiries/[id] error:", error);
    return apiServerError();
  }
}
