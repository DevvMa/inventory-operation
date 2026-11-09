import { parseStock } from './stock.js';
import { useRef, useState } from 'react';

export default function StockEditor({ product, isSaving, onSave, onCancel }) {
  const [draftStock, setDraftStock] = useState(String(product.stock));
  const [fieldError, setFieldError] = useState('');
  const [saveError, setSaveError] = useState('');
  const inputRef = useRef(null);
  async function handleSubmit(event) {
    event.preventDefault();
    if (isSaving) return;
    let stock;
    try { stock = parseStock(draftStock); } catch (error) {
      setFieldError(error.message);
      inputRef.current?.focus();
      return;
    }
    setFieldError('');
    setSaveError('');
    try { await onSave(stock); } catch (error) { setSaveError(error.message || 'Gagal menyimpan stok. Coba lagi.'); }
  }
  return <form className="stock-editor" aria-labelledby="editor-title" noValidate onSubmit={handleSubmit}>
    <h2 id="editor-title">Edit stok</h2>
    <p className="editor-product">{product.title}</p>
    <p>Stok saat ini: <strong>{product.stock}</strong></p>
    <label htmlFor="stock">Stok baru</label>
    <input ref={inputRef} aria-invalid={Boolean(fieldError)} aria-describedby={fieldError ? "stock-error" : "stock-hint"} id="stock" disabled={isSaving} type="number" min="0" step="1" value={draftStock} onChange={(event) => { setDraftStock(event.target.value); setFieldError(''); setSaveError(''); }} />
    {saveError && <p role="alert">{saveError}</p>}
    {fieldError && <p id="stock-error" role="alert">{fieldError}</p>}
    <p id="stock-hint" className="field-hint">Berpindah produk akan membuang perubahan yang belum disimpan.</p>
    <div className="editor-actions"><button type="submit" disabled={isSaving}>{isSaving ? 'Menyimpan…' : 'Simpan stok'}</button><button type="button" disabled={isSaving} onClick={onCancel}>Batal</button></div>
  </form>;
}
