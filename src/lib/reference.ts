/** Short, human-friendly inquiry reference such as FN-261027-AB12. */
export function makeReference() {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  return `FN-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
