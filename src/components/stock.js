export function parseStock(raw) {
  const text = raw.trim();
  const stock = Number(text);
  if (!text || !Number.isSafeInteger(stock) || stock < 0) throw new Error('Stok harus berupa bilangan bulat 0 atau lebih dalam batas angka aman.');
  return stock;
}
