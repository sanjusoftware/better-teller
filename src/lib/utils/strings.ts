import { generateRandomString } from "@oslojs/crypto/random";
import type { RandomReader } from "@oslojs/crypto/random";

const random: RandomReader = {
  read(bytes) {
    crypto.getRandomValues(bytes);
  }
};

export const generateId = (length: number) => {
  // 10-characters long string consisting of the upper case letters
  return generateRandomString(random, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", length);
}

export const humanize = (text: string) => {
  // Insert a space before each capital letter
  const spacedName = text.replace(/([A-Z])/g, ' $1').trim();
  // Capitalize the first letter of each word
  const humanReadableName = spacedName.replace(/\b\w/g, char => char.toUpperCase());

  return humanReadableName;
}