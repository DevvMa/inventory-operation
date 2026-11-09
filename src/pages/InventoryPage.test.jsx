import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import InventoryPage from './InventoryPage.jsx';

test('explains that demo stock changes last only for the current session', () => {
  render(<InventoryPage />);
  expect(screen.getByText(
    'Demo: perubahan stok hanya berlaku selama sesi dan akan direset saat halaman dimuat ulang.',
  )).toBeVisible();
});
