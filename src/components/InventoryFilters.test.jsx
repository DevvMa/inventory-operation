import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import InventoryFilters from './InventoryFilters.jsx';

test('provides labelled controlled search, filter and reset callbacks', async () => {
  const query = vi.fn(), stock = vi.fn(), reset = vi.fn();
  render(<InventoryFilters query="" lowStockOnly={false} onQueryChange={query} onLowStockChange={stock} onReset={reset} />);
  await userEvent.type(screen.getByRole('searchbox', { name: 'Cari produk' }), 'x');
  expect(query).toHaveBeenCalledWith('x');
  await userEvent.click(screen.getByRole('checkbox', { name: /Stok rendah/ }));
  expect(stock).toHaveBeenCalledWith(true);
  await userEvent.click(screen.getByRole('button', { name: 'Reset filter' }));
  expect(reset).toHaveBeenCalledOnce();
});
