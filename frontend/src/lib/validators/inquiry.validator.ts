import { z } from "zod";

/**
 * Inquiry Validators
 *
 * Zod schemas for inquiry/contact form validation.
 */

export const inquiryTypes = ["contact", "property"] as const;
export const inquiryStatuses = ["new", "read", "replied", "closed"] as const;

/**
 * Schema for submitting a new inquiry (public)
 */
export const submitInquirySchema = z.object({
  type: z.enum(inquiryTypes, {
    message: "Tipe inquiry tidak valid",
  }),
  subject: z.string().max(200, "Subjek maksimal 200 karakter").optional().nullable(),
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z
    .string()
    .regex(/^(\+62|62|0)[0-9]{8,13}$/, "Nomor telepon tidak valid")
    .optional()
    .nullable()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(2000, "Pesan maksimal 2000 karakter"),
  property_id: z.string().uuid("Property ID tidak valid").optional().nullable(),
});

/**
 * Schema for updating inquiry status (admin only)
 */
export const updateInquiryStatusSchema = z.object({
  status: z.enum(inquiryStatuses, {
    message: "Status tidak valid",
  }),
  notes: z.string().max(1000, "Catatan maksimal 1000 karakter").optional().nullable(),
});

// Type exports
export type SubmitInquiryInput = z.infer<typeof submitInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
