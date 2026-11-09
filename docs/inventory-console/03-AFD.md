# AFD Inventory Operations Console

Status: alur yang direncanakan 0.1. Aturan dan acceptance criteria bersumber dari [PRD](01-PRD.md).

## Memuat dan menemukan produk

1. Buka halaman → tampilkan loading (R01/R05).
2. GET berhasil → simpan produk → tampilkan tabel dan jumlah yang dimuat.
3. GET gagal/timeout/respons invalid → tampilkan pesan dan Coba lagi. Retry kembali ke loading.
4. API mengembalikan array kosong → tampilkan Data produk belum tersedia.
5. Pengguna mengetik pencarian atau mengubah checkbox → hitung hasil gabungan dari data lokal.
6. Hasil filter kosong → tampilkan Tidak ada produk yang cocok dan Reset filter; reset mengosongkan query dan menonaktifkan checkbox.

## Mengubah stok

1. Klik Edit stok → editor menampilkan identitas produk dan stok saat ini.
2. Sebelum submit, memilih produk lain membuang draft dan membuka nilai produk baru; beri petunjuk perilaku ini pada form.
3. Klik Batal → tutup editor, data tabel tidak berubah.
4. Submit input invalid → tampilkan kesalahan di field, fokuskan input, tidak ada PATCH (R03).
5. Submit valid → status menyimpan; kunci form, batal, dan semua aksi edit (R04).
6. PATCH gagal/timeout/respons invalid → buka kembali kontrol; pertahankan draft dan data tabel lama; tampilkan error di form. Submit ulang mencoba kembali.
7. PATCH berhasil → ganti stok pada state parent → tutup editor → tampilkan pesan sukses (R06).
8. Hitung ulang hasil filter. Jika produk tidak lagi stok rendah, baris boleh hilang; pesan sukses tetap terlihat di atas tabel.

## Perubahan tampilan dan sesi

- Mengubah filter tidak menutup editor yang sudah aktif; identitas produk tetap terlihat meskipun barisnya tersembunyi oleh filter.
- Setelah simpan sukses/batal, pindahkan fokus ke input pencarian agar tidak tertinggal pada elemen yang dihapus.
- Reload menghapus perubahan lokal dan memulai GET baru; pemberitahuan keterbatasan selalu terlihat (R07).
- Belum ada konfirmasi navigasi keluar atau mekanisme pemulihan draft setelah reload.

Detail presentasi di [DBD](04-DBD.md); pemeriksaan alur di [IPD](06-IPD.md).
