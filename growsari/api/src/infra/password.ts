import * as crypto from "crypto";

function generateSalt(length: number = 12) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

function sha(password: string, salt: string) {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);

  return hash.digest("hex");
}

export function encrypt(password: string): { hash: string; salt: string } {
  const salt = generateSalt();
  const hash = sha(password, salt);

  return {
    hash,
    salt
  };
}
