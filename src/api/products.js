const BASE_URL = 'https://dummyjson.com';

export async function updateStock(id, stock, { signal } = {}) {
  const data = await requestJson('/products/' + id, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ stock }),
  }, signal);
  if (data?.id !== id || data?.stock !== stock || !Number.isSafeInteger(data.stock) || data.stock < 0) throw new Error('Konfirmasi stok tidak valid. Coba lagi.');
  return { id: data.id, stock: data.stock };
}

async function requestJson(path, init, signal) {
  const controller = new AbortController();
  if (signal?.aborted) throw new DOMException('Request cancelled', 'AbortError');
  let cancel;
  let timer;
  const interrupted = new Promise((_, reject) => {
    cancel = () => {
      controller.abort();
      reject(new DOMException('Request cancelled', 'AbortError'));
    };
    signal?.addEventListener('abort', cancel, { once: true });
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error('Waktu permintaan habis. Coba lagi.'));
    }, 10_000);
  });
  try {
    return await Promise.race([
      interrupted,
      (async () => {
        const response = await fetch(`${BASE_URL}${path}`, { ...init, signal: controller.signal });
        if (!response.ok) throw new Error(init.method === 'PATCH' ? 'Tidak dapat menyimpan stok. Coba lagi.' : 'Tidak dapat memuat data. Coba lagi.');
        return response.json();
      })(),
    ]);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', cancel);
  }
}

export async function getProducts({ signal } = {}) {
  const data = await requestJson('/products?limit=50&select=id,title,category,price,stock', {}, signal);
  if (!Array.isArray(data?.products) || !data.products.every((p) => p && Number.isSafeInteger(p.id) && typeof p.title === 'string' && typeof p.category === 'string' && Number.isFinite(p.price) && Number.isSafeInteger(p.stock) && p.stock >= 0)) {
    throw new Error('Data produk tidak valid. Coba lagi.');
  }
  return data.products;
}
