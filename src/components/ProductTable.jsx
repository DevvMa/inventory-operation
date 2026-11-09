const number = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });

export default function ProductTable({ products, editingDisabled, onEdit }) {
  return (
    <div className="table-scroll" role="region" aria-label="Daftar produk" tabIndex={0}>
      <table>
        <caption className="sr-only">Produk yang dimuat dari API</caption>
        <thead><tr>{['Produk', 'Kategori', 'Harga dari API', 'Stok', 'Aksi'].map((label) => <th scope="col" key={label}>{label}</th>)}</tr></thead>
        <tbody>{products.map((product) => (
          <tr key={product.id}>
            <th scope="row">{product.title}</th>
            <td>{product.category}</td>
            <td className="numeric">{number.format(product.price)}</td>
            <td><span className="stock-value">{product.stock}</span> <span className={product.stock < 10 ? 'stock-tag low' : 'stock-tag'}>{product.stock < 10 ? 'Stok rendah' : 'Cukup'}</span></td>
            <td><button type="button" className="edit-button" disabled={editingDisabled} aria-label={'Edit stok ' + product.title} onClick={() => onEdit(product.id)}>Edit stok</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
