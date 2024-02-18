export function generateId(max: number = 10000) {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * max);
}
