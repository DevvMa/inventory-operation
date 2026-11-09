import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import ProductTable from './ProductTable.jsx';
import { products } from '../tests/fixtures/products.js';

test('shows product data, stock labels and an edit action', async () => {
  const onEdit = vi.fn();
  render(<ProductTable products={products} editingDisabled={false} onEdit={onEdit} />);
  const table = screen.getByRole('table');
  expect(within(table).getAllByRole('columnheader').map((x) => x.textContent)).toEqual(['Produk', 'Kategori', 'Harga dari API', 'Stok', 'Aksi']);
  expect(within(table).getAllByRole('row')).toHaveLength(4);
  expect(within(table).getAllByText('Stok rendah')).toHaveLength(2);
  expect(within(table).getByText('Cukup')).toBeVisible();
  expect(table.textContent).not.toMatch(/Rp|USD|\$/);
  await userEvent.click(screen.getByRole('button', { name: 'Edit stok Kopi A' }));
  expect(onEdit).toHaveBeenCalledWith(1);
});
