import {
  apiSuccess,
  apiError,
  apiServerError,
} from "@/lib/utils";
import { logout } from "@/lib/services";

/**
 * POST /api/auth/logout
 * Logout current user
 */
export async function POST() {
  try {
    const result = await logout();

    if (!result.success) {
      return apiError(result.error);
    }

    return apiSuccess({ message: "Logged out successfully" });
  } catch (error) {
    console.error("POST /api/auth/logout error:", error);
    return apiServerError();
  }
}
