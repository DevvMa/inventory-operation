# TRD Inventory Operations Console

Status: keputusan teknis baseline 0.1, belum diimplementasikan. Requirement mengacu ke [PRD](01-PRD.md).

## Stack dan komponen

Usulan implementasi: React dengan JavaScript/JSX, Vite, CSS sederhana, fetch native; Vitest dan React Testing Library untuk tes perilaku. Versi paket dipilih kompatibel saat setup dan dikunci dalam lockfile. Tidak menambah state library atau router untuk satu halaman ini.

| Bagian | Tanggung jawab |
| --- | --- |
| InventoryPage | Data produk, status muat, query, filter, produk terpilih, dan penggantian stok setelah simpan |
| InventoryFilters | Input query dan checkbox melalui props/callback |
| ProductTable | Render data terfilter dengan key id dan aksi edit |
| StockEditor | Draft stok, validasi, status simpan/error; reset melalui key productId |
| api/products.js | Request GET/PATCH, pemeriksaan HTTP dan respons |

## State dan aliran data

- Parent: products, loadStatus, loadError, query, lowStockOnly, selectedProductId, isSaving, successMessage.
- Editor: draftStock sebagai string agar kosong dapat dibedakan dari 0; fieldError dan saveError.
- visibleProducts, selectedProduct, dan jumlah hasil dihitung dari state; tidak disimpan sebagai salinan.
- Update array/object secara immutable. Parent memperbarui hanya stok produk dengan id yang cocok.
- useEffect mengambil produk saat mount; AbortController membatalkan request saat cleanup. Retry memakai request baru setelah kegagalan. Abort tidak ditampilkan sebagai kegagalan pengguna.
- Simpan dipicu submit event, bukan Effect. Editor memanggil fungsi simpan parent; status isSaving dikembalikan melalui props. Tidak ada optimistic update, polling, atau refresh otomatis.

## Kontrak API untuk R01 dan R04

Base URL: https://dummyjson.com

| Operasi | Request | Respons yang digunakan |
| --- | --- | --- |
| Daftar | GET /products?limit=50&select=id,title,category,price,stock | products: array; tiap item memiliki id integer, title/category string, price angka finite, stock integer nonnegatif |
| Update | PATCH /products/{id}; Content-Type: application/json; body {"stock":12} | id sesuai request dan stock sesuai nilai integer yang dikirim |

Pemeriksaan: response.ok harus benar sebelum membaca hasil sebagai sukses. JSON tidak valid/shape tidak cocok menjadi error yang dapat ditangani. Jangan mengganti kegagalan API dengan data palsu tanpa label.

Hanya isi stok respons PATCH diterapkan pada produk lokal; properti lain dipertahankan. Jika layanan merespons sukses HTTP tetapi id/stok tidak sesuai, pertahankan data lama dan tampilkan kegagalan. Update server tidak persisten menurut [dokumentasi DummyJSON](https://dummyjson.com/docs/products).

Untuk timeout, batasi request 10 detik dan bersihkan timer pada selesai/cleanup. Timeout tampil sebagai kegagalan dengan opsi mencoba kembali. Ini keputusan demo, bukan SLA API.

## Validasi dan ketahanan

Trim input terlebih dahulu; tolak string kosong sebelum konversi. Number.isSafeInteger(value) dan value >= 0 harus benar. Gunakan min=0 dan step=1 sebagai bantuan UI; validasi JS tetap menentukan. Escape teks melalui rendering React biasa; jangan gunakan dangerouslySetInnerHTML.

Form dikunci selama request; tombol batal dan aksi edit lain juga nonaktif. Filter tetap dapat digunakan. Pesan sukses diletakkan di parent agar tetap terlihat setelah editor ditutup. Batalkan editor menutup form tanpa menyimpan; memilih produk lain sebelum submit membuang draft lama sesuai AFD.

## Verifikasi

Proses pengembangan: TDD dengan satu perilaku per siklus Red → Green → Refactor. Tes ditulis dan dijalankan sebelum perubahan perilaku; suite tidak ditunda sampai tahap akhir. Baca [Alur TDD](08-TDD-WORKFLOW.md) untuk dasar buku, batas adaptasi, serta pencatatan bukti. Stack Vitest/React Testing Library tetap dipakai; buku menggunakan Jest/Enzyme. Task audit mengulas tes yang sudah memandu implementasi, bukan menulis seluruh tes sesudah fitur selesai.

Mock batas jaringan untuk menguji respons berhasil, gagal, tertunda, serta tidak valid. Tes interaksi memeriksa apa yang terlihat dan dapat dilakukan pengguna. Wajib: gabungan filter (R02), validasi (R03), serta simpan sukses/gagal dan konsistensi hasil (R04–R06). Build harus lulus. Checklist rinci dan bukti ada di [IPD](06-IPD.md).

Tidak mengklaim optimasi performa terukur atau kesiapan multi-user. useMemo/custom Hook ditambahkan hanya jika ada kebutuhan yang bisa dijelaskan.
