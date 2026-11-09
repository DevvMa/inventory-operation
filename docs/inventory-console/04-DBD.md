# DBD Inventory Operations Console

Status: arahan desain demo hasil sintesis 0.1; belum ada validasi pengguna atau review visual implementasi.

## Hierarki halaman

1. Judul Inventory Operations Console dan penjelasan singkat fungsi.
2. Pemberitahuan demo: perubahan hanya bertahan selama sesi dan direset saat reload.
3. Pencarian nama dan checkbox Stok rendah di bawah 10.
4. Jumlah hasil dan jumlah produk yang dimuat; pesan sukses bila ada.
5. Tabel: Produk, Kategori, Harga dari API, Stok, Aksi.
6. Editor stok: identitas produk, stok sekarang, input stok baru, Simpan, Batal.

Desktop: tabel dan editor boleh berdampingan. Layar kecil: editor di atas tabel; tabel dapat digulir horizontal dalam wadah sendiri tanpa membuat seluruh halaman melebar. Tidak perlu sidebar navigasi untuk satu halaman.

## Aturan visual dan aksesibilitas untuk R08

- Latar terang, teks gelap, satu warna aksen untuk aksi utama. Gunakan font sistem dan skala spasi sederhana.
- Stok rendah memiliki teks penanda; warna bukan satu-satunya pembeda.
- Gunakan label input yang terlihat, tombol native, header tabel semantik, serta focus ring yang jelas.
- Saat editor dibuka, fokuskan input stok. Saat ditutup, ikuti pengembalian fokus di AFD.
- Field error terhubung melalui aria-describedby dan aria-invalid; status sukses memakai role=status, kegagalan memakai role=alert.
- Tampilkan harga sebagai angka API dengan format konsisten, tanpa simbol mata uang yang tidak dikonfirmasi.
- Periksa keterbacaan dan kontras sebelum menyatakan aksesibel; atribut ARIA saja bukan bukti kelulusan aksesibilitas.

## Kondisi yang wajib terlihat

| Kondisi | Presentasi |
| --- | --- |
| Loading | Teks Memuat produk; jangan tampilkan pesan hasil kosong |
| Gagal muat | Pesan ringkas dan tombol Coba lagi |
| Data kosong | Penjelasan data API kosong |
| Filter kosong | Penjelasan hasil kosong dan Reset filter |
| Menyimpan | Label Menyimpan; kontrol terkait disabled |
| Gagal simpan | Error di editor; input tetap utuh |
| Sukses | Nama produk dan stok baru di area status parent |

Petunjuk editor: Berpindah produk akan membuang perubahan yang belum disimpan. Detail alur di [AFD](03-AFD.md), aturan validasi di [PRD](01-PRD.md).
