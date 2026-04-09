import { pbkdf2Sync, randomBytes } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash:admin-password -- "your-password"');
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const iterations = 210000;
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("hex");

console.log(`VITE_ADMIN_PASSWORD_SALT=${salt}`);
console.log(`VITE_ADMIN_PASSWORD_ITERATIONS=${iterations}`);
console.log(`VITE_ADMIN_PASSWORD_HASH=${hash}`);
