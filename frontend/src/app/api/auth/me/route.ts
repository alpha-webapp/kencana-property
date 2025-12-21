import {
  apiSuccess,
  apiServerError,
} from "@/lib/utils";
import { getCurrentUser } from "@/lib/services";

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
export async function GET() {
  try {
    const result = await getCurrentUser();

    if (!result.success) {
      return apiSuccess({ user: null });
    }

    return apiSuccess({ user: result.data });
  } catch (error) {
    console.error("GET /api/auth/me error:", error);
    return apiServerError();
  }
}
