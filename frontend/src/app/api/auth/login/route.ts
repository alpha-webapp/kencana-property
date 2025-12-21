import { NextRequest } from "next/server";
import {
  apiSuccess,
  apiError,
  apiServerError,
} from "@/lib/utils";
import { login } from "@/lib/services";

/**
 * POST /api/auth/login
 * Login with email and password
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return apiError("Email dan password diperlukan", 400);
    }

    const result = await login(email, password);

    if (!result.success) {
      return apiError(result.error, 401);
    }

    return apiSuccess(result.data);
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return apiServerError();
  }
}
