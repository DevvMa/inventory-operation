import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test, vi } from 'vitest';
import InventoryPage from './InventoryPage.jsx';
import { getProducts, updateStock } from '../api/products.js';
import { products } from '../tests/fixtures/products.js';

vi.mock('../api/products.js', () => ({ getProducts: vi.fn(), updateStock: vi.fn() }));
beforeEach(() => { getProducts.mockReset().mockImplementation(() => new Promise(() => {})); updateStock.mockReset(); });

test('explains that demo stock changes last only for the current session', () => {
  render(<InventoryPage />);
  expect(screen.getByText(
    'Demo: perubahan stok hanya berlaku selama sesi dan akan direset saat halaman dimuat ulang.',
  )).toBeVisible();
});

test('shows loading while the product request is pending', () => {
  render(<InventoryPage />);
  expect(screen.getByRole('status')).toHaveTextContent('Memuat produk');
  expect(screen.queryByText('Data produk belum tersedia.')).not.toBeInTheDocument();
});

test('shows the count of products actually loaded', async () => {
  getProducts.mockResolvedValue(products);
  render(<InventoryPage />);
  expect(await screen.findByText('3 produk dimuat')).toBeVisible();
  expect(screen.queryByText('Memuat produk…')).not.toBeInTheDocument();
});

test('recovers from a failed load with an explicit retry', async () => {
  getProducts.mockRejectedValueOnce(new Error('API unavailable')).mockResolvedValueOnce(products);
  render(<InventoryPage />);
  expect(await screen.findByRole('alert')).toHaveTextContent('API unavailable');
  await userEvent.click(screen.getByRole('button', { name: 'Coba lagi' }));
  expect(await screen.findByText('3 produk dimuat')).toBeVisible();
  expect(getProducts).toHaveBeenCalledTimes(2);
});

test('aborts on unmount and ignores the old result after remount', async () => {
  let resolveOld;
  getProducts.mockImplementationOnce(() => new Promise((resolve) => { resolveOld = resolve; }));
  const old = render(<InventoryPage />);
  const signal = getProducts.mock.calls[0][0].signal;
  old.unmount();
  expect(signal.aborted).toBe(true);
  getProducts.mockResolvedValueOnce([]);
  render(<InventoryPage />);
  await screen.findByText('0 produk dimuat');
  await act(async () => { resolveOld(products); });
  expect(screen.getByText('0 produk dimuat')).toBeVisible();
});

test('shows products from the API in the table', async () => {
  getProducts.mockResolvedValue(products);
  render(<InventoryPage />);
  expect(await screen.findByRole('table')).toHaveTextContent('Kopi A');
});

test('distinguishes an empty API result from loading or failure', async () => {
  getProducts.mockResolvedValue([]);
  render(<InventoryPage />);
  expect(await screen.findByText('Data produk belum tersedia.')).toBeVisible();
  expect(screen.queryByRole('table')).not.toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('combines trimmed case-insensitive search with low-stock filtering and reset', async () => {
  getProducts.mockResolvedValue(products);
  render(<InventoryPage />);
  await screen.findByRole('table');
  const search = screen.getByRole('searchbox', { name: 'Cari produk' });
  await userEvent.type(search, ' KOPI ');
  await userEvent.click(screen.getByRole('checkbox', { name: /Stok rendah/ }));
  expect(screen.getByText('2 hasil')).toBeVisible();
  expect(screen.queryByText('Teh C')).not.toBeInTheDocument();
  await userEvent.clear(search);
  expect(screen.getByText('2 hasil')).toBeVisible();
  await userEvent.type(search, 'teh');
  expect(screen.getByText('Tidak ada produk yang cocok.')).toBeVisible();
  await userEvent.click(screen.getByRole('button', { name: 'Reset filter' }));
  expect(screen.getByText('3 hasil')).toBeVisible();
  expect(search).toHaveValue('');
  expect(getProducts).toHaveBeenCalledOnce();
});

test('opens one stock editor with the selected product value', async () => {
  getProducts.mockResolvedValue(products);
  render(<InventoryPage />);
  await userEvent.click(await screen.findByRole('button', { name: 'Edit stok Kopi A' }));
  expect(screen.getByRole('form', { name: 'Edit stok' })).toBeVisible();
  expect(screen.getByRole('spinbutton', { name: 'Stok baru' })).toHaveValue(0);
});

test('switching product resets the draft, cancel preserves stock and filters keep the editor', async () => {
  getProducts.mockResolvedValue(products);
  render(<InventoryPage />);
  await userEvent.click(await screen.findByRole('button', { name: 'Edit stok Kopi A' }));
  await userEvent.clear(screen.getByRole('spinbutton', { name: 'Stok baru' }));
  await userEvent.type(screen.getByRole('spinbutton', { name: 'Stok baru' }), '4');
  await userEvent.click(screen.getByRole('button', { name: 'Edit stok Kopi B' }));
  expect(screen.getByRole('spinbutton', { name: 'Stok baru' })).toHaveValue(9);
  await userEvent.type(screen.getByRole('searchbox'), 'teh');
  expect(screen.getByRole('form', { name: 'Edit stok' })).toHaveTextContent('Kopi B');
  await userEvent.click(screen.getByRole('button', { name: 'Batal' }));
  expect(screen.queryByRole('form')).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Reset filter' }));
  expect(screen.getByRole('row', { name: /Kopi A/ })).toHaveTextContent('0');
});

test('updates stock only after PATCH succeeds and keeps the success message after closing', async () => {
  getProducts.mockResolvedValue(products);
  let finish;
  updateStock.mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
  render(<InventoryPage />);
  await userEvent.click(await screen.findByRole('button', { name: 'Edit stok Kopi B' }));
  const input = screen.getByRole('spinbutton');
  await userEvent.clear(input); await userEvent.type(input, '12');
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  expect(updateStock).toHaveBeenCalledWith(2, 12, expect.objectContaining({ signal: expect.any(AbortSignal) }));
  expect(screen.getByRole('row', { name: /Kopi B/ })).toHaveTextContent('9');
  await act(async () => { finish({ id: 2, stock: 12 }); });
  expect(await screen.findByRole('status')).toHaveTextContent('Stok Kopi B diperbarui menjadi 12.');
  expect(screen.queryByRole('form')).not.toBeInTheDocument();
  expect(screen.getByRole('row', { name: /Kopi B/ })).toHaveTextContent('12');
  expect(screen.getByRole('row', { name: /Kopi A/ })).toHaveTextContent('0');
});

test('prevents duplicate saves and editing while pending but keeps filtering available', async () => {
  getProducts.mockResolvedValue(products);
  let finish;
  updateStock.mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
  render(<InventoryPage />);
  await userEvent.click(await screen.findByRole('button', { name: 'Edit stok Kopi B' }));
  await userEvent.dblClick(screen.getByRole('button', { name: 'Simpan stok' }));
  expect(updateStock).toHaveBeenCalledOnce();
  expect(screen.getByRole('spinbutton')).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Batal' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Edit stok Kopi A' })).toBeDisabled();
  expect(screen.getByRole('searchbox')).toBeEnabled();
  await act(async () => { finish({ id: 2, stock: 9 }); });
});
test('failed save preserves stock and draft; retry success removes a row from the low-stock filter', async () => {
  getProducts.mockResolvedValue(products);
  updateStock.mockRejectedValueOnce(new Error('Gagal menyimpan stok')).mockResolvedValueOnce({ id: 2, stock: 12 });
  render(<InventoryPage />);
  await screen.findByRole('table');
  await userEvent.click(screen.getByRole('checkbox', { name: /Stok rendah/ }));
  await userEvent.click(screen.getByRole('button', { name: 'Edit stok Kopi B' }));
  await userEvent.clear(screen.getByRole('spinbutton')); await userEvent.type(screen.getByRole('spinbutton'), '12');
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Gagal menyimpan stok');
  expect(screen.getByRole('spinbutton')).toHaveValue(12);
  expect(screen.getByRole('row', { name: /Kopi B/ })).toHaveTextContent('9');
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  expect(await screen.findByRole('status')).toHaveTextContent('Stok Kopi B diperbarui menjadi 12.');
  expect(screen.queryByRole('row', { name: /Kopi B/ })).not.toBeInTheDocument();
  expect(screen.getByText('1 hasil')).toBeVisible();
});
test('aborts a save on unmount and ignores late success after remount', async () => {
  getProducts.mockResolvedValue(products);
  let finish;
  updateStock.mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
  const view = render(<InventoryPage />);
  await userEvent.click(await screen.findByRole('button', { name: 'Edit stok Kopi B' }));
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  const signal = updateStock.mock.calls[0][2].signal;
  view.unmount(); expect(signal.aborted).toBe(true);
  render(<InventoryPage />); await screen.findByRole('table');
  await act(async () => { finish({ id: 2, stock: 99 }); });
  expect(screen.queryByText(/diperbarui menjadi/)).not.toBeInTheDocument();
  expect(screen.getByRole('row', { name: /Kopi B/ })).toHaveTextContent('9');
});

test('moves focus into the editor and returns to search after cancel or success', async () => {
  getProducts.mockResolvedValue(products);
  updateStock.mockResolvedValue({ id: 2, stock: 9 });
  render(<InventoryPage />);
  await userEvent.click(await screen.findByRole('button', { name: 'Edit stok Kopi B' }));
  expect(screen.getByRole('spinbutton')).toHaveFocus();
  await userEvent.click(screen.getByRole('button', { name: 'Batal' }));
  expect(screen.getByRole('searchbox')).toHaveFocus();
  await userEvent.click(screen.getByRole('button', { name: 'Edit stok Kopi B' }));
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  await screen.findByRole('status');
  expect(screen.getByRole('searchbox')).toHaveFocus();
});

test.each(['Data produk tidak valid. Coba lagi.', 'Waktu permintaan habis. Coba lagi.'])('shows recoverable API failure: %s', async (message) => {
  getProducts.mockRejectedValueOnce(new Error(message)).mockResolvedValueOnce(products);
  render(<InventoryPage />);
  expect(await screen.findByRole('alert')).toHaveTextContent(message);
  await userEvent.click(screen.getByRole('button', { name: 'Coba lagi' }));
  expect(await screen.findByRole('table')).toBeVisible();
});
test('allows keyboard movement from the stock input to save and cancel', async () => {
  getProducts.mockResolvedValue(products);
  render(<InventoryPage />);
  await userEvent.click(await screen.findByRole('button', { name: 'Edit stok Kopi B' }));
  expect(screen.getByRole('spinbutton')).toHaveFocus();
  await userEvent.tab(); expect(screen.getByRole('button', { name: 'Simpan stok' })).toHaveFocus();
  await userEvent.tab(); expect(screen.getByRole('button', { name: 'Batal' })).toHaveFocus();
  await userEvent.keyboard('{Enter}'); expect(screen.getByRole('searchbox')).toHaveFocus();
});

test('announces changing filter result counts politely', async () => {
  getProducts.mockResolvedValue(products);
  render(<InventoryPage />);
  const count = (await screen.findByText('3 hasil')).parentElement;
  expect(count).toHaveAttribute('aria-live', 'polite');
  expect(count).toHaveAttribute('aria-atomic', 'true');
  await userEvent.type(screen.getByRole('searchbox'), 'missing');
  expect(count).toHaveTextContent('0 hasil');
});
