import { NextResponse } from "next/server";

/**
 * API Response Helpers
 *
 * Consistent response format for all API routes.
 */

export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Return a successful JSON response
 */
export function apiSuccess<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Return an error JSON response
 */
export function apiError(message: string, status = 400): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ success: false, error: message }, { status });
}

/**
 * 401 Unauthorized
 */
export function apiUnauthorized(message = "Unauthorized"): NextResponse<ApiResponse<never>> {
  return apiError(message, 401);
}

/**
 * 403 Forbidden
 */
export function apiForbidden(message = "Forbidden"): NextResponse<ApiResponse<never>> {
  return apiError(message, 403);
}

/**
 * 404 Not Found
 */
export function apiNotFound(resource = "Resource"): NextResponse<ApiResponse<never>> {
  return apiError(`${resource} not found`, 404);
}

/**
 * 500 Internal Server Error
 */
export function apiServerError(message = "Internal server error"): NextResponse<ApiResponse<never>> {
  return apiError(message, 500);
}

/**
 * 422 Validation Error
 */
export function apiValidationError(message: string): NextResponse<ApiResponse<never>> {
  return apiError(message, 422);
}
