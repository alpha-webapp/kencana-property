import { createClient, createAdminClient } from "@/lib/supabase/server";
import { ok, err, type ServiceResult } from "@/lib/types";
import type { Profile } from "@/lib/supabase/types";

/**
 * Auth Service
 *
 * Handles authentication-related business logic.
 */

/**
 * Login with email and password
 */
export async function login(
  email: string,
  password: string
): Promise<ServiceResult<{ user: Profile }>> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    return err("Email atau password salah", "AUTH_ERROR");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (!profile) {
    return err("Profil tidak ditemukan", "NOT_FOUND");
  }

  return ok({ user: profile });
}

/**
 * Logout current user
 */
export async function logout(): Promise<ServiceResult<void>> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    return err("Gagal logout", "AUTH_ERROR");
  }

  return ok(undefined);
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<ServiceResult<Profile | null>> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return ok(null);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return ok(profile);
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const result = await getCurrentUser();

  if (!result.success || !result.data) {
    return false;
  }

  return result.data.role === "admin";
}

/**
 * Request password reset
 */
export async function requestPasswordReset(
  email: string
): Promise<ServiceResult<void>> {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    console.error("Password reset error:", error);
    return err("Gagal mengirim email reset password", "AUTH_ERROR");
  }

  return ok(undefined);
}

/**
 * Update password
 */
export async function updatePassword(
  newPassword: string
): Promise<ServiceResult<void>> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("Update password error:", error);
    return err("Gagal mengupdate password", "AUTH_ERROR");
  }

  return ok(undefined);
}
