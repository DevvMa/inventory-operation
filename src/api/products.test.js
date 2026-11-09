import { afterEach, expect, test, vi } from 'vitest';
import { getProducts } from './products.js';
import { products } from '../tests/fixtures/products.js';

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
const respond = (data, ok = true) => vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok, json: async () => data }));

test('loads at most 50 products and selects only the required fields', async () => {
  respond({ products });
  expect(await getProducts()).toEqual(products);
  expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=50&select=id,title,category,price,stock', expect.any(Object));
});

test('rejects an unsuccessful HTTP response', async () => {
  respond({ products }, false);
  await expect(getProducts()).rejects.toThrow('Tidak dapat memuat data');
});

test.each([null, {}, { products: [{}] }, { products: [{ ...products[0], stock: -1 }] }, { products: [{ ...products[0], price: Infinity }] }])('rejects an invalid response shape: %j', async (data) => {
  respond(data);
  await expect(getProducts()).rejects.toThrow('Data produk tidak valid');
});

test('rejects invalid JSON instead of reporting success', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => { throw new SyntaxError('Invalid JSON'); } }));
  await expect(getProducts()).rejects.toThrow();
});

test('times out after 10 seconds and aborts the request', async () => {
  vi.useFakeTimers();
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
  const check = expect(getProducts()).rejects.toThrow('Waktu permintaan habis');
  await vi.advanceTimersByTimeAsync(10_000);
  await check;
  expect(fetch.mock.calls[0][1].signal.aborted).toBe(true);
  expect(vi.getTimerCount()).toBe(0);
}, 1000);

test('caller cancellation rejects as AbortError and clears timers', async () => {
  vi.useFakeTimers();
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
  const controller = new AbortController();
  const check = expect(getProducts({ signal: controller.signal })).rejects.toMatchObject({ name: 'AbortError' });
  controller.abort();
  await check;
  expect(vi.getTimerCount()).toBe(0);
});

test('an already aborted caller does not start fetch', async () => {
  respond({ products });
  const controller = new AbortController();
  controller.abort();
  await expect(getProducts({ signal: controller.signal })).rejects.toMatchObject({ name: 'AbortError' });
  expect(fetch).not.toHaveBeenCalled();
});
