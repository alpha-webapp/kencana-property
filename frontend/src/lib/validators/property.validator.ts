import { z } from "zod";

/**
 * Property Validators
 *
 * Zod schemas for property input validation.
 * Matches the database schema in supabase/types.ts
 */

// Enum values matching database constraints
export const transactionTypes = ["dijual", "disewa"] as const;
export const propertyTypes = ["rumah", "apartemen", "tanah", "villa", "ruko", "kos"] as const;
export const propertyStatuses = ["draft", "published", "sold", "rented", "archived"] as const;
export const districts = ["Sleman", "Bantul", "Kota Yogyakarta", "Gunung Kidul", "Kulon Progo"] as const;
export const certificates = ["shm", "shgb", "shp", "girik", "ppjb", "lainnya"] as const;
export const furnishedOptions = ["furnished", "semi-furnished", "unfurnished"] as const;

/**
 * Schema for creating a new property
 */
export const createPropertySchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter")
    .max(200, "Judul maksimal 200 karakter"),
  description: z.string().optional().nullable(),
  transaction_type: z.enum(transactionTypes, {
    message: "Tipe transaksi harus dijual atau disewa",
  }),
  property_type: z.enum(propertyTypes, {
    message: "Tipe properti tidak valid",
  }),
  status: z.enum(propertyStatuses).optional().default("draft"),
  price: z
    .number()
    .positive("Harga harus lebih dari 0")
    .int("Harga harus bilangan bulat"),
  price_label: z.string().optional().nullable(),
  address: z
    .string()
    .min(10, "Alamat minimal 10 karakter")
    .max(500, "Alamat maksimal 500 karakter"),
  sub_district: z.string().optional().nullable(),
  district: z.enum(districts, {
    message: "Kabupaten/Kota tidak valid",
  }),
  province: z.string().optional().default("DI Yogyakarta"),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  land_size: z.number().positive("Luas tanah harus positif").optional().nullable(),
  building_size: z.number().positive("Luas bangunan harus positif").optional().nullable(),
  bedrooms: z.number().int().min(0).optional().nullable(),
  bathrooms: z.number().int().min(0).optional().nullable(),
  floors: z.number().int().min(1).optional().nullable(),
  certificate: z.enum(certificates).optional().nullable(),
  electricity: z.number().positive().optional().nullable(),
  furnished: z.enum(furnishedOptions).optional().nullable(),
  facing: z.string().optional().nullable(),
  year_built: z
    .number()
    .int()
    .min(1900, "Tahun bangun tidak valid")
    .max(new Date().getFullYear(), "Tahun bangun tidak boleh di masa depan")
    .optional()
    .nullable(),
  featured_image: z.string().url("URL gambar tidak valid").optional().nullable(),
  features: z.array(z.string()).optional().default([]),
});

/**
 * Schema for updating a property (all fields optional)
 */
export const updatePropertySchema = createPropertySchema.partial();

/**
 * Schema for publishing a property (validates required fields)
 */
export const publishPropertySchema = createPropertySchema.extend({
  status: z.literal("published"),
  featured_image: z.string().url("Gambar utama diperlukan untuk publikasi"),
});

// Type exports
export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
export type PublishPropertyInput = z.infer<typeof publishPropertySchema>;
