/**
 * Service Result Type
 *
 * A discriminated union type for consistent service layer responses.
 * All services return this type, making error handling predictable.
 */

export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string };

/**
 * Create a successful result
 */
export function ok<T>(data: T): ServiceResult<T> {
  return { success: true, data };
}

/**
 * Create an error result
 */
export function err<T = never>(error: string, code?: string): ServiceResult<T> {
  return { success: false, error, code };
}

/**
 * Type guard to check if result is successful
 */
export function isOk<T>(result: ServiceResult<T>): result is { success: true; data: T } {
  return result.success === true;
}

/**
 * Type guard to check if result is an error
 */
export function isErr<T>(result: ServiceResult<T>): result is { success: false; error: string; code?: string } {
  return result.success === false;
}

/**
 * Unwrap a successful result or throw an error
 */
export function unwrap<T>(result: ServiceResult<T>): T {
  if (result.success) {
    return result.data;
  }
  throw new Error(result.error);
}

/**
 * Unwrap a successful result or return a default value
 */
export function unwrapOr<T>(result: ServiceResult<T>, defaultValue: T): T {
  if (result.success) {
    return result.data;
  }
  return defaultValue;
}
