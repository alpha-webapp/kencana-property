// Services exports

// Property Service
export {
  createProperty,
  updateProperty,
  deleteProperty,
  publishProperty,
  unpublishProperty,
  getAllProperties,
  getPropertyById,
} from "./properties.service";

// Inquiry Service
export {
  submitInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  markInquiryAsRead,
  markInquiryAsReplied,
  closeInquiry,
  getInquiryCounts,
} from "./inquiries.service";

// Auth Service
export {
  login,
  logout,
  getCurrentUser,
  isAdmin,
  requestPasswordReset,
  updatePassword,
} from "./auth.service";

// Storage Service
export {
  uploadPropertyImage,
  deletePropertyImage,
  getPublicUrl,
  addPropertyImageRecord,
  deletePropertyImageRecord,
  uploadAndSavePropertyImage,
  deletePropertyImageComplete,
} from "./storage.service";
