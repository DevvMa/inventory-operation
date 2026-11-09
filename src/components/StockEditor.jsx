import { parseStock } from './stock.js';
import { useRef, useState } from 'react';

export default function StockEditor({ product, isSaving, onSave, onCancel, saveEnabled = true }) {
  const [draftStock, setDraftStock] = useState(String(product.stock));
  const [fieldError, setFieldError] = useState('');
  const inputRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    let stock;
    try { stock = parseStock(draftStock); } catch (error) {
      setFieldError(error.message);
      inputRef.current?.focus();
      return;
    }
    setFieldError('');
    onSave(stock);
  }
  return <form className="stock-editor" aria-labelledby="editor-title" noValidate onSubmit={handleSubmit}>
    <h2 id="editor-title">Edit stok</h2>
    <p className="editor-product">{product.title}</p>
    <p>Stok saat ini: <strong>{product.stock}</strong></p>
    <label htmlFor="stock">Stok baru</label>
    <input ref={inputRef} aria-invalid={Boolean(fieldError)} aria-describedby={fieldError ? "stock-error" : "stock-hint"} id="stock" type="number" min="0" step="1" value={draftStock} onChange={(event) => { setDraftStock(event.target.value); setFieldError(''); }} />
    {fieldError && <p id="stock-error" role="alert">{fieldError}</p>}
    <p id="stock-hint" className="field-hint">Berpindah produk akan membuang perubahan yang belum disimpan.</p>
    <div className="editor-actions"><button type="submit" disabled={!saveEnabled}>Simpan stok</button><button type="button" onClick={onCancel}>Batal</button></div>
  </form>;
}
