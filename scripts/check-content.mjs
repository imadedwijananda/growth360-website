import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const errors = [];

const forbidden = [
  [/gojek/i, "Gojek"],
  [/pertamina/i, "Pertamina"],
  [/\bBCA\b/, "BCA"],
  [/8\s*[,.]\s*5\s*T/i, "IDR 8,5 T"],
  [/\bIDR\b/, "IDR"],
  [/\bRp\b/, "Rp"],
  [/lorem ipsum/i, "lorem ipsum"],
  [/testimoni/i, "testimoni"],
  [/placeholder/i, "placeholder"],
  [/fonts\.google/i, "Google Fonts CDN"],
  [/cdnjs|unpkg|jsdelivr/i, "external CDN"],
];

for (const [pattern, label] of forbidden) {
  if (pattern.test(html)) errors.push(`Forbidden content found: ${label}`);
}

const required = [
  "Andari Salon",
  "Majora.id",
  "nama klien dirahasiakan",
  "I Made Dwijananda",
  "PT. Solusi Era Digital",
  "sales@growth360.my.id",
  "wa.me/6287862770959",
  "+62 878-6277-0959",
  "www.growth360.my.id",
  "Bali, Indonesia",
  "6–8 minggu",
  "50% DP",
  "30 hari kalender",
  "1×24 jam kerja",
  "4 jam kerja",
  "one ecosystem with 30 business engines",
  "Basic Care",
  "Priority Care",
  "Ilustrasi — bukan tangkapan layar asli",
];

for (const phrase of required) {
  if (!html.includes(phrase)) errors.push(`Missing required phrase: ${phrase}`);
}

const illustrations = html.split("Ilustrasi — bukan tangkapan layar asli").length - 1;
if (illustrations < 2) {
  errors.push("Both portfolio pieces need the illustration disclaimer");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Content check passed.");
