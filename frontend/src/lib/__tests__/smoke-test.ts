/**
 * Smoke Test Script
 * 
 * Quick validation of validators and types.
 * Run with: npx tsx src/lib/__tests__/smoke-test.ts
 */

import {
  createPropertySchema,
  updatePropertySchema,
  submitInquirySchema,
  updateInquiryStatusSchema,
} from "../validators";

import { ok, err, isOk, isErr } from "../types";

console.log("🧪 Running smoke tests...\n");

let passed = 0;
let failed = 0;

function test(name: string, fn: () => boolean) {
  try {
    if (fn()) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
      failed++;
    }
  } catch (e) {
    console.log(`❌ ${name} - Error: ${e}`);
    failed++;
  }
}

// Test ServiceResult helpers
test("ok() creates success result", () => {
  const result = ok({ id: "123" });
  return result.success === true && result.data.id === "123";
});

test("err() creates error result", () => {
  const result = err("Something went wrong", "ERR_CODE");
  return result.success === false && result.error === "Something went wrong";
});

test("isOk() type guard works", () => {
  const success = ok("data");
  const failure = err("error");
  return isOk(success) && !isOk(failure);
});

test("isErr() type guard works", () => {
  const success = ok("data");
  const failure = err("error");
  return isErr(failure) && !isErr(success);
});

// Test Property Validator
test("createPropertySchema validates valid input", () => {
  const result = createPropertySchema.safeParse({
    title: "Rumah Mewah di Jogja",
    transaction_type: "dijual",
    property_type: "rumah",
    price: 1500000000,
    address: "Jl. Kaliurang KM 10, Ngaglik",
    district: "Sleman",
  });
  return result.success === true;
});

test("createPropertySchema rejects short title", () => {
  const result = createPropertySchema.safeParse({
    title: "abc",
    transaction_type: "dijual",
    property_type: "rumah",
    price: 1500000000,
    address: "Jl. Kaliurang KM 10, Ngaglik",
    district: "Sleman",
  });
  return result.success === false;
});

test("createPropertySchema rejects invalid transaction_type", () => {
  const result = createPropertySchema.safeParse({
    title: "Rumah Mewah di Jogja",
    transaction_type: "invalid",
    property_type: "rumah",
    price: 1500000000,
    address: "Jl. Kaliurang KM 10",
    district: "Sleman",
  });
  return result.success === false;
});

test("createPropertySchema rejects negative price", () => {
  const result = createPropertySchema.safeParse({
    title: "Rumah Mewah di Jogja",
    transaction_type: "dijual",
    property_type: "rumah",
    price: -100,
    address: "Jl. Kaliurang KM 10",
    district: "Sleman",
  });
  return result.success === false;
});

test("updatePropertySchema allows partial input", () => {
  const result = updatePropertySchema.safeParse({
    title: "Updated Title Here",
  });
  return result.success === true;
});

// Test Inquiry Validator
test("submitInquirySchema validates valid input", () => {
  const result = submitInquirySchema.safeParse({
    type: "contact",
    name: "John Doe",
    email: "john@example.com",
    message: "Saya tertarik dengan properti ini",
  });
  return result.success === true;
});

test("submitInquirySchema rejects invalid email", () => {
  const result = submitInquirySchema.safeParse({
    type: "contact",
    name: "John Doe",
    email: "invalid-email",
    message: "Saya tertarik dengan properti ini",
  });
  return result.success === false;
});

test("submitInquirySchema rejects short message", () => {
  const result = submitInquirySchema.safeParse({
    type: "contact",
    name: "John Doe",
    email: "john@example.com",
    message: "Hi",
  });
  return result.success === false;
});

test("updateInquiryStatusSchema validates valid status", () => {
  const result = updateInquiryStatusSchema.safeParse({
    status: "read",
  });
  return result.success === true;
});

test("updateInquiryStatusSchema rejects invalid status", () => {
  const result = updateInquiryStatusSchema.safeParse({
    status: "invalid",
  });
  return result.success === false;
});

// Summary
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
