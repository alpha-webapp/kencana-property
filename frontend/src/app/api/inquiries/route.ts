import { NextRequest } from "next/server";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiServerError,
} from "@/lib/utils";
import {
  submitInquiry,
  getInquiries,
  isAdmin,
} from "@/lib/services";
import type { SubmitInquiryInput } from "@/lib/validators";

/**
 * GET /api/inquiries
 * List all inquiries (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as "new" | "read" | "replied" | "closed" | null;
    const limit = searchParams.get("limit");

    const result = await getInquiries({
      status: status || undefined,
      limit: limit ? parseInt(limit) : undefined,
    });

    if (!result.success) {
      return apiError(result.error);
    }

    return apiSuccess(result.data);
  } catch (error) {
    console.error("GET /api/inquiries error:", error);
    return apiServerError();
  }
}

/**
 * POST /api/inquiries
 * Submit a new inquiry (public - from contact form)
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitInquiryInput;
    const result = await submitInquiry(body);

    if (!result.success) {
      return apiError(result.error, result.code === "VALIDATION_ERROR" ? 422 : 400);
    }

    return apiSuccess(result.data, 201);
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return apiServerError();
  }
}
