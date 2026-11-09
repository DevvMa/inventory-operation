# BSD Inventory Operations Console

Status: **tidak berlaku untuk perancangan backend/database sendiri** pada baseline 0.1.

## Fakta sumber

Backend demo menggunakan layanan publik DummyJSON. Endpoint PATCH mengembalikan simulasi perubahan; perubahan tidak disimpan permanen pada server. [Dokumentasi resmi](https://dummyjson.com/docs/products)

## Keputusan batas sistem

- Tidak ada tabel database, migrasi, ORM, server aplikasi sendiri, atau pengelolaan akun pengguna.
- Kontrak request dan field API bersumber dari [TRD](02-TRD.md); jangan membuat definisi kedua di sini.
- Data hasil GET berada di memori React. Setelah PATCH berhasil, stok lokal diganti untuk sesi tersebut. Reload memuat ulang data API.
- Tidak ada audit trail, persistensi, koordinasi perubahan antarpengguna, atau otorisasi production.

Dokumen ini dipertahankan untuk menjelaskan batas tanggung jawab backend, bukan untuk mengesankan ada backend yang dibangun. Jika kelak dibutuhkan penyimpanan nyata atau banyak admin, scope dan desain backend harus ditinjau kembali sebelum membuat klaim kesiapan production.
