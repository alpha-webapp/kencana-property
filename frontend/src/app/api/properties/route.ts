import { NextRequest } from "next/server";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiServerError,
} from "@/lib/utils";
import {
  createProperty,
  getAllProperties,
  isAdmin,
} from "@/lib/services";
import type { CreatePropertyInput } from "@/lib/validators";

/**
 * GET /api/properties
 * List all properties (admin view - includes drafts)
 */
export async function GET() {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const result = await getAllProperties();

    if (!result.success) {
      return apiError(result.error);
    }

    return apiSuccess(result.data);
  } catch (error) {
    console.error("GET /api/properties error:", error);
    return apiServerError();
  }
}

/**
 * POST /api/properties
 * Create a new property (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return apiUnauthorized();
    }

    const body = (await request.json()) as CreatePropertyInput;
    const result = await createProperty(body);

    if (!result.success) {
      return apiError(result.error, result.code === "VALIDATION_ERROR" ? 422 : 400);
    }

    return apiSuccess(result.data, 201);
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return apiServerError();
  }
}
