import { useEffect, useState } from 'react';
import ProductTable from '../components/ProductTable.jsx';
import { getProducts } from '../api/products.js';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loadStatus, setLoadStatus] = useState('loading');
  const [loadError, setLoadError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoadStatus('loading');
    setLoadError('');
    getProducts({ signal: controller.signal }).then((data) => {
      if (!controller.signal.aborted) {
        setProducts(data);
        setLoadStatus('ready');
      }
    }).catch((error) => {
      if (!controller.signal.aborted) {
        setLoadError(error.message || 'Gagal memuat produk.');
        setLoadStatus('error');
      }
    });
    return () => controller.abort();
  }, [attempt]);

  return (
    <main>
      <h1>Inventory Operations Console</h1>
      <p>Temukan produk dan koreksi stok inventori.</p>
      <p>Demo: perubahan stok hanya berlaku selama sesi dan akan direset saat halaman dimuat ulang.</p>
      {loadStatus === 'loading' && <p role="status">Memuat produk…</p>}
      {loadStatus === 'error' && <div><p role="alert">{loadError}</p><button onClick={() => setAttempt((n) => n + 1)}>Coba lagi</button></div>}
      {loadStatus === 'ready' && <><p>{products.length} produk dimuat</p>{products.length ? <ProductTable products={products} onEdit={() => {}} editingDisabled={false} /> : <p>Data produk belum tersedia.</p>}</>}
    </main>
  );
}
