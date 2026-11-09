import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test, vi } from 'vitest';
import InventoryPage from './InventoryPage.jsx';
import { getProducts } from '../api/products.js';
import { products } from '../tests/fixtures/products.js';

vi.mock('../api/products.js', () => ({ getProducts: vi.fn() }));
beforeEach(() => { getProducts.mockReset().mockImplementation(() => new Promise(() => {})); });

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
