import test from "node:test";
import assert from "node:assert/strict";
import { extractErrorCode, formatError } from "./error-codes.mjs";

test("extractErrorCode returns null for resultXdr rather than guessing numbers from stringified XDR (Fixes #859)", () => {
  // Real Soroban resultXdr carries fees and sequence numbers before any error discriminant
  const resultFromString = extractErrorCode({ resultXdr: "AAAAAAAnE+AAAABkAAAAAAAAAA..." });
  assert.equal(resultFromString, null);

  const resultFromObject = extractErrorCode({ resultXdr: { feeCharged: 100, result: 1 } });
  assert.equal(resultFromObject, null);

  const resultWithDigits = extractErrorCode({ resultXdr: "fee: 100, sequence: 12345" });
  assert.equal(resultWithDigits, null);
});

test("formatError indicates no error code detected instead of falsely diagnosing contract errors from resultXdr (Fixes #859)", () => {
  const formatted = formatError({ resultXdr: "AAAAAAAnE+AAAABkAAAAAAAAAA..." }, "escrow");
  assert.match(formatted, /No error code detected/);
  assert.doesNotMatch(formatted, /Detected error code/);
  assert.doesNotMatch(formatted, /AlreadyInitialized/);
});

test("extractErrorCode still extracts string patterns and code properties when resultXdr is absent", () => {
  assert.equal(extractErrorCode("error: 12"), 12);
  assert.equal(extractErrorCode("code: 5"), 5);
  assert.equal(extractErrorCode({ code: 5 }), 5);
  assert.equal(extractErrorCode({ error: "7" }), 7);
  assert.equal(extractErrorCode(null), null);
});
