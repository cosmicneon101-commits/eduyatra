const FORBIDDEN_WORDS = [
  "abuse", "idiot", "stupid", "scam", "fraud", "fake", "fuck", "shit",
  "bitch", "asshole", "bastard", "randi", "mujhi", "lado", "chikne", "geda",
  "chutiya", "bhalu", "ladoo", "madarchod", "behenchod"
];

export function containsProfanity(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return FORBIDDEN_WORDS.some((w) => new RegExp(`\b${w}\b`, "i").test(lower));
}

export function sanitizeText(text: string): string {
  let cleaned = text;
  FORBIDDEN_WORDS.forEach((w) => {
    cleaned = cleaned.replace(new RegExp(`\b${w}\b`, "gi"), "***");
  });
  return cleaned;
}
