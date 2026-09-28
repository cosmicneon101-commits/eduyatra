const FORBIDDEN_WORDS = [
  "abuse", "idiot", "stupid", "scam", "fraud", "fake", "fuck", "shit",
  "bitch", "asshole", "bastard", "randi", "mujhi", "lado", "chikne", "geda",
  "chutiya", "bhalu", "ladoo", "madarchod", "behenchod",
];

function wordPattern(word: string): RegExp {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i");
}

export function containsProfanity(text: string): boolean {
  if (!text) return false;
  return FORBIDDEN_WORDS.some((word) => wordPattern(word).test(text));
}

export function sanitizeText(text: string): string {
  let cleaned = text;
  FORBIDDEN_WORDS.forEach((word) => {
    cleaned = cleaned.replace(wordPattern(word), "***");
  });
  return cleaned;
}
