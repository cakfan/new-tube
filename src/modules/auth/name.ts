export function extractName(input: string): string {
  // Split the string into an array of words
  const words = input.trim().split(/\s+/);
  // Return the first two words joined by a space
  return words.slice(0, 2).join(" ");
}
