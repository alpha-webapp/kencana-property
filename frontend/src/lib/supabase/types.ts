export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: "user" | "admin" | "agent";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          role?: "user" | "admin" | "agent";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: "user" | "admin" | "agent";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          transaction_type: "dijual" | "disewa";
          property_type: "rumah" | "apartemen" | "tanah" | "villa" | "ruko" | "kos";
          status: "draft" | "published" | "sold" | "rented" | "archived";
          price: number;
          price_label: string | null;
          address: string;
          sub_district: string | null;
          district: "Sleman" | "Bantul" | "Kota Yogyakarta" | "Gunung Kidul" | "Kulon Progo";
          province: string;
          latitude: number | null;
          longitude: number | null;
          land_size: number | null;
          building_size: number | null;
          bedrooms: number | null;
          bathrooms: number | null;
          floors: number | null;
          certificate: "shm" | "shgb" | "shp" | "girik" | "ppjb" | "lainnya" | null;
          electricity: number | null;
          furnished: "furnished" | "semi-furnished" | "unfurnished" | null;
          facing: string | null;
          year_built: number | null;
          featured_image: string | null;
          features: Json;
          agent_id: string | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug?: string;
          description?: string | null;
          transaction_type: "dijual" | "disewa";
          property_type: "rumah" | "apartemen" | "tanah" | "villa" | "ruko" | "kos";
          status?: "draft" | "published" | "sold" | "rented" | "archived";
          price: number;
          price_label?: string | null;
          address: string;
          sub_district?: string | null;
          district: "Sleman" | "Bantul" | "Kota Yogyakarta" | "Gunung Kidul" | "Kulon Progo";
          province?: string;
          latitude?: number | null;
          longitude?: number | null;
          land_size?: number | null;
          building_size?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          floors?: number | null;
          certificate?: "shm" | "shgb" | "shp" | "girik" | "ppjb" | "lainnya" | null;
          electricity?: number | null;
          furnished?: "furnished" | "semi-furnished" | "unfurnished" | null;
          facing?: string | null;
          year_built?: number | null;
          featured_image?: string | null;
          features?: Json;
          agent_id?: string | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          transaction_type?: "dijual" | "disewa";
          property_type?: "rumah" | "apartemen" | "tanah" | "villa" | "ruko" | "kos";
          status?: "draft" | "published" | "sold" | "rented" | "archived";
          price?: number;
          price_label?: string | null;
          address?: string;
          sub_district?: string | null;
          district?: "Sleman" | "Bantul" | "Kota Yogyakarta" | "Gunung Kidul" | "Kulon Progo";
          province?: string;
          latitude?: number | null;
          longitude?: number | null;
          land_size?: number | null;
          building_size?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          floors?: number | null;
          certificate?: "shm" | "shgb" | "shp" | "girik" | "ppjb" | "lainnya" | null;
          electricity?: number | null;
          furnished?: "furnished" | "semi-furnished" | "unfurnished" | null;
          facing?: string | null;
          year_built?: number | null;
          featured_image?: string | null;
          features?: Json;
          agent_id?: string | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
      property_images: {
        Row: {
          id: string;
          property_id: string;
          url: string;
          storage_path: string | null;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          url: string;
          storage_path?: string | null;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          url?: string;
          storage_path?: string | null;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          type: "contact" | "property";
          subject: string | null;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          property_id: string | null;
          status: "new" | "read" | "replied" | "closed";
          notes: string | null;
          created_at: string;
          read_at: string | null;
          replied_at: string | null;
        };
        Insert: {
          id?: string;
          type: "contact" | "property";
          subject?: string | null;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          property_id?: string | null;
          status?: "new" | "read" | "replied" | "closed";
          notes?: string | null;
          created_at?: string;
          read_at?: string | null;
          replied_at?: string | null;
        };
        Update: {
          id?: string;
          type?: "contact" | "property";
          subject?: string | null;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          property_id?: string | null;
          status?: "new" | "read" | "replied" | "closed";
          notes?: string | null;
          created_at?: string;
          read_at?: string | null;
          replied_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

// Helper types for easier use
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Property = Database["public"]["Tables"]["properties"]["Row"];
export type PropertyImage = Database["public"]["Tables"]["property_images"]["Row"];
export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];

export type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"];
export type PropertyUpdate = Database["public"]["Tables"]["properties"]["Update"];
export type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];
