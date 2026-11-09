import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import StockEditor from './StockEditor.jsx';
import { products } from '../tests/fixtures/products.js';

test('submits zero as an integer stock value', async () => {
  const onSave = vi.fn().mockResolvedValue(undefined);
  render(<StockEditor product={products[0]} isSaving={false} onSave={onSave} onCancel={() => {}} />);
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  expect(onSave).toHaveBeenCalledWith(0);
});

test('rejects an empty stock value without calling save and keeps focus on the input', async () => {
  const onSave = vi.fn();
  render(<StockEditor product={products[1]} isSaving={false} onSave={onSave} onCancel={() => {}} />);
  const input = screen.getByRole('spinbutton', { name: 'Stok baru' });
  await userEvent.clear(input);
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Stok harus');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveFocus();
  expect(input).toHaveValue(null);
  expect(onSave).not.toHaveBeenCalled();
});

test.each(['-1', '1.5', '9007199254740992'])('does not submit invalid number %s', async (raw) => {
  const onSave = vi.fn();
  render(<StockEditor product={products[1]} isSaving={false} onSave={onSave} onCancel={() => {}} />);
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: raw } });
  fireEvent.submit(screen.getByRole('form'));
  expect(screen.getByRole('alert')).toBeVisible();
  expect(onSave).not.toHaveBeenCalled();
});
test('accepts the unchanged integer value', async () => {
  const onSave = vi.fn().mockResolvedValue(undefined);
  render(<StockEditor product={products[1]} isSaving={false} onSave={onSave} onCancel={() => {}} />);
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  expect(onSave).toHaveBeenCalledWith(9);
});

test('locks the form while a save is pending', () => {
  const onSave = vi.fn(), onCancel = vi.fn();
  render(<StockEditor product={products[1]} isSaving={true} onSave={onSave} onCancel={onCancel} />);
  expect(screen.getByRole('spinbutton')).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Menyimpan…' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Batal' })).toBeDisabled();
  fireEvent.submit(screen.getByRole('form'));
  expect(onSave).not.toHaveBeenCalled();
});

test('keeps the draft on save failure and supports correction and retry', async () => {
  const onSave = vi.fn().mockRejectedValueOnce(new Error('Gagal menyimpan stok')).mockResolvedValueOnce(undefined);
  render(<StockEditor product={products[1]} isSaving={false} onSave={onSave} onCancel={() => {}} />);
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Gagal menyimpan stok');
  expect(screen.getByRole('spinbutton')).toHaveValue(9);
  await userEvent.clear(screen.getByRole('spinbutton')); await userEvent.type(screen.getByRole('spinbutton'), '12');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Simpan stok' }));
  expect(onSave).toHaveBeenCalledTimes(2);
  expect(onSave).toHaveBeenLastCalledWith(12);
});

test('announces that the editor is busy while saving', () => {
  render(<StockEditor product={products[1]} isSaving={true} onSave={vi.fn()} onCancel={vi.fn()} />);
  expect(screen.getByRole('form')).toHaveAttribute('aria-busy', 'true');
});
