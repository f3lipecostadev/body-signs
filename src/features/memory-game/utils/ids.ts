export function createUniqueId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}