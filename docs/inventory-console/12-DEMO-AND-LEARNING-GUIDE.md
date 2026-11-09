# Panduan demo dan pemahaman React

Tujuan: menjelaskan prototipe secara jujur dalam sekitar tiga menit. Ini panduan latihan, bukan bukti bahwa pemilik sudah menguasai materi.

## Jalankan aplikasi

Gunakan Node 22.12+ pada major 22 dan npm. Dari root proyek:

```powershell
npm ci
npm run dev
```

Buka alamat yang dicetak Vite. Pada sesi development ini server menggunakan http://127.0.0.1:5173/. Terminal kedua:

```powershell
npm test
```

Tes sekali jalan: npm run test:run. Build: npm run build. Tidak diperlukan database, API key, atau file .env untuk scope ini.

## Urutan demo tiga menit

1. **Masalah dan scope, 30 detik.** Admin perlu menemukan produk dan mengoreksi stok. Data berasal dari DummyJSON; maksimal 50 produk dimuat. Semua data adalah demo.
2. **Temukan produk, 40 detik.** Cari sebagian nama yang terlihat pada tabel, lalu aktifkan stok rendah. Angka hasil hanya mencakup produk yang dimuat. Gunakan Reset filter untuk memulihkan tampilan.
3. **Edit, 50 detik.** Buka satu produk, kosongkan input lalu simpan untuk menunjukkan validasi. Masukkan bilangan bulat minimal 0, simpan, dan tunjukkan perubahan setelah respons sukses. Produk dapat keluar dari filter stok rendah jika stoknya menjadi 10 atau lebih.
4. **Keandalan dan batas, 40 detik.** Selama menyimpan, kontrol edit terkunci. Tes otomatis menunjukkan gagal/sukses, retry, timeout dan pembatalan. Jangan menyebut kasus error sebagai demo browser nyata jika hanya ditunjukkan melalui tes.
5. **Batas penyimpanan, 20 detik.** PATCH API disimulasikan; perubahan lokal direset setelah reload. Ini latihan React, bukan sistem inventory production atau bukti empat tahun pengalaman React.

Pilih produk dari respons aktual, bukan menghafal nama/id atau nilai stok server. Kopi A/B dan Teh C adalah fixture tes lokal, bukan data yang dijanjikan muncul pada API.

## Penjelasan kode

| Pertanyaan | Penjelasan singkat |
| --- | --- |
| Di mana data disimpan? | InventoryPage memiliki products, query, filter, produk terpilih, status muat/simpan, dan pesan sukses. StockEditor memiliki draft input serta error form. |
| Mengapa draft berupa string? | Input kosong harus berbeda dari stok 0. String baru dikonversi setelah validasi. |
| Mengapa hasil filter bukan state baru? | Hasil bisa dihitung dari products, query, dan checkbox; salinan state berisiko tidak sinkron setelah stok berubah. |
| Mengapa GET di Effect? | Muat data saat halaman aktif, lalu batalkan request ketika halaman ditinggalkan. StrictMode development dapat menjalankan setup/cleanup tambahan. |
| Mengapa PATCH pada submit? | Penyimpanan terjadi karena tindakan pengguna, bukan karena perubahan render/state yang diamati Effect. |
| Apa yang terjadi saat PATCH gagal? | Data tabel dan draft tetap. Error memberi jalur retry; keberhasilan HTTP saja belum cukup bila id/stok respons tidak sesuai. |
| Bagaimana update tetap konsisten? | Parent membuat array baru dan mengganti hanya stok produk dengan id yang cocok; filter dihitung ulang dari array tersebut. |
| Bagaimana mencegah submit ganda? | Kontrol disabled saat pending dan ref controller menjadi guard request yang sedang berjalan. |
| Apa beda abort dan timeout? | Abort adalah pembatalan caller saat cleanup; tidak ditampilkan sebagai error palsu. Timeout membatasi request 10 detik dan memberi pesan retry. |
| Mengapa key memakai product.id? | Pergantian produk me-remount editor sehingga draft/error lama tidak terbawa. |
| Mengapa tanpa Redux? | State dan komunikasi komponen masih dapat ditangani satu parent pada satu halaman ini. |

## Bukti TDD yang dapat dijelaskan

Pilih satu pasangan evidence Red/Green, misalnya T13-C02 untuk input kosong atau M4-R01 untuk batas 50. Jelaskan requirement, assertion yang gagal, implementasi minimal, dan alasan refactor. Jangan sengaja merusak kode selesai lalu mengklaimnya sebagai riwayat TDD.

## Latihan pemilik untuk T29

Setelah membaca kode, jelaskan dengan bahasamu sendiri:

1. Lokasi state dan alasan hasil filter tidak disimpan sebagai state baru.
2. Mengapa GET memakai Effect sedangkan PATCH memakai submit handler.
3. Apa yang tetap saat simpan gagal, bagaimana update immutable, dan mengapa guard submit diperlukan.
4. Perbedaan abort vs timeout, serta dampak key editor.

Latihan perubahan kecil: ubah teks label atau pesan tanpa mengubah aturan bisnis, jalankan tes yang relevan, dan jelaskan hasilnya. Jika menambah perilaku, mulai dengan tes gagal. Penguasaan pemilik baru boleh dinyatakan terverifikasi setelah jawaban/latihan benar-benar diperiksa.
