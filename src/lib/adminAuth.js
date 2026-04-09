const encoder = new TextEncoder();

function hexToBytes(hex) {
  if (!hex || hex.length % 2 !== 0) {
    return new Uint8Array();
  }

  const bytes = new Uint8Array(hex.length / 2);

  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }

  return bytes;
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let mismatch = 0;

  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
}

async function derivePasswordHash(password, salt, iterations) {
  const keyMaterial = await globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const derivedBits = await globalThis.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: hexToBytes(salt),
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  return bufferToHex(derivedBits);
}

export async function verifyAdminPassword(password) {
  const salt = import.meta.env.VITE_ADMIN_PASSWORD_SALT;
  const expectedHash = (import.meta.env.VITE_ADMIN_PASSWORD_HASH || "").toLowerCase();
  const iterations = Number(import.meta.env.VITE_ADMIN_PASSWORD_ITERATIONS || 210000);

  if (!globalThis.crypto?.subtle || !salt || !expectedHash || !Number.isFinite(iterations)) {
    console.warn("Admin password verification is not configured correctly.");
    return false;
  }

  if (!password) {
    return false;
  }

  const actualHash = await derivePasswordHash(password, salt, iterations);
  return constantTimeEqual(actualHash, expectedHash);
}
