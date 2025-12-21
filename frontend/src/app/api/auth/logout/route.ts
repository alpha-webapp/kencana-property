import { NextResponse } from "next/server";
import {
  apiSuccess,
  apiServerError,
} from "@/lib/utils";
import { logout } from "@/lib/services";

/**
 * POST /api/auth/logout
 * Logout current user
 */
export async function POST(request: Request) {
  try {
    const result = await logout();

    if (!result.success) {
      // Still redirect even on error
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check if this is a form submission (redirect) or API call (JSON)
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // Form submission - redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return apiSuccess({ message: "Logged out successfully" });
  } catch (error) {
    console.error("POST /api/auth/logout error:", error);
    return apiServerError();
  }
}
