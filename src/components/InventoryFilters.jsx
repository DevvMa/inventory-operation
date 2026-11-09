export default function InventoryFilters({ query, lowStockOnly, onQueryChange, onLowStockChange, onReset, inputRef }) {
  return <div className="filters">
    <div className="search-field"><label htmlFor="search">Cari produk</label><input ref={inputRef} id="search" type="search" placeholder="Cari berdasarkan nama produk" value={query} onChange={(event) => onQueryChange(event.target.value)} /></div>
    <label className="checkbox-label"><input type="checkbox" checked={lowStockOnly} onChange={(event) => onLowStockChange(event.target.checked)} />Stok rendah (&lt; 10)</label>
    <button type="button" className="quiet-button" onClick={onReset}>Reset filter</button>
  </div>;
}
