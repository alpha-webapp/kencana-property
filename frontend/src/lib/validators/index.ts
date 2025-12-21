// Validators exports
export {
  // Property
  createPropertySchema,
  updatePropertySchema,
  publishPropertySchema,
  transactionTypes,
  propertyTypes,
  propertyStatuses,
  districts,
  certificates,
  furnishedOptions,
  type CreatePropertyInput,
  type UpdatePropertyInput,
  type PublishPropertyInput,
} from "./property.validator";

export {
  // Inquiry
  submitInquirySchema,
  updateInquiryStatusSchema,
  inquiryTypes,
  inquiryStatuses,
  type SubmitInquiryInput,
  type UpdateInquiryStatusInput,
} from "./inquiry.validator";
