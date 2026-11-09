import { useEffect, useState } from 'react';
import InventoryFilters from '../components/InventoryFilters.jsx';
import StockEditor from '../components/StockEditor.jsx';
import ProductTable from '../components/ProductTable.jsx';
import { getProducts } from '../api/products.js';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loadStatus, setLoadStatus] = useState('loading');
  const [loadError, setLoadError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const selectedProduct = products.find((product) => product.id === selectedProductId);
  const visibleProducts = products.filter((product) => product.title.toLowerCase().includes(query.trim().toLowerCase()) && (!lowStockOnly || product.stock < 10));
  function resetFilters() { setQuery(''); setLowStockOnly(false); }

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
      <InventoryFilters query={query} lowStockOnly={lowStockOnly} onQueryChange={setQuery} onLowStockChange={setLowStockOnly} onReset={resetFilters} />
      {selectedProduct && <StockEditor key={selectedProduct.id} product={selectedProduct} isSaving={false} saveEnabled={false} onSave={async () => { throw new Error('Penyimpanan belum tersedia.'); }} onCancel={() => setSelectedProductId(null)} />}
      {loadStatus === 'loading' && <p role="status">Memuat produk…</p>}
      {loadStatus === 'error' && <div><p role="alert">{loadError}</p><button onClick={() => setAttempt((n) => n + 1)}>Coba lagi</button></div>}
      {loadStatus === 'ready' && <><p className="result-count"><span>{products.length} produk dimuat</span><span>{visibleProducts.length} hasil</span></p>{products.length ? (visibleProducts.length ? <ProductTable products={visibleProducts} onEdit={setSelectedProductId} editingDisabled={false} /> : <p>Tidak ada produk yang cocok.</p>) : <p>Data produk belum tersedia.</p>}</>}
    </main>
  );
}
