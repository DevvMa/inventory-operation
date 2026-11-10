# Inventory Operations Console

Paket dokumentasi ringkas untuk prototipe React persiapan interview. Dibuat 9 November 2026. Target interview: 10 November 2026 pukul 10.00 menurut percakapan; zona waktu undangan perlu diperiksa oleh pemilik.

## Status dan cara membaca

**Fakta konteks:** lowongan meminta React, integrasi REST API, troubleshooting, testing, dan kolaborasi. Pengguna menyatakan belum memiliki expertise React. Seluruh fitur inventory sudah diimplementasikan; 63 tes dan build lulus. Browser check Chromium desktop/mobile emulation sudah selesai. Pemilik meminta sesi belajar terpisah; penguasaannya belum terverifikasi. Lihat handoff akhir untuk batas bukti.

**Keputusan rancangan hasil sintesis:** enam dokumen berikut menjadi baseline implementasi versi 0.1. Ini dokumentasi proyek yang disesuaikan dengan waktu persiapan, bukan klaim kepatuhan ISO atau bukti kemampuan React empat tahun.

| Dokumen | Sumber utama untuk |
| --- | --- |
| [PRD](01-PRD.md) | Scope, aturan bisnis demo, acceptance criteria |
| [TRD](02-TRD.md) | Komponen, state, kontrak API, strategi testing |
| [AFD](03-AFD.md) | Transisi alur dan pemulihan kegagalan |
| [DBD](04-DBD.md) | Layout, kontrol, aksesibilitas, kondisi visual |
| [BSD](05-BSD.md) | Batas tanggung jawab backend dan penyimpanan |
| [IPD](06-IPD.md) | Urutan kerja, batas waktu, bukti verifikasi |
| [Milestone dan task](07-MILESTONES-AND-TASKS.md) | Task kecil, dependensi, kontrak pelaksana, kriteria selesai, dan ledger |
| [Alur TDD](08-TDD-WORKFLOW.md) | Dasar buku, adaptasi tooling, siklus test-first, dan bukti Red/Green/refactor |
| [Git workflow](09-GIT-WORKFLOW.md) | Assignment, review, CI, dan merge |
| [Laporan M0](10-M0-VERIFICATION.md) | Verifikasi fondasi |
| [Laporan M1–M5](11-REMAINING-MILESTONES.md) | Bukti implementasi dan keterbatasan |
| [Panduan demo](12-DEMO-AND-LEARNING-GUIDE.md) | Setup, demo tiga menit, dan latihan pemilik |
| [Browser check](13-BROWSER-CHECK.md) | T25 selesai, screenshot, hasil browser, dan batas cakupan |
| [Handoff akhir](14-FINAL-HANDOFF.md) | Audit requirement dan status tersisa |

Untuk melanjutkan pekerjaan: baca README → PRD → TRD → IPD, lalu AFD/DBD ketika mengerjakan interaksi. BSD menjelaskan alasan tidak ada database sendiri. Jangan membaca status checklist sebagai hasil pengujian sebelum ada bukti.

Untuk eksekusi satu task oleh model atau developer junior, gunakan paket konteks dan template instruksi dalam [Milestone dan task](07-MILESTONES-AND-TASKS.md). Semua task teknis selesai, termasuk T25. T29 ditunda atas permintaan pemilik. Lihat [hasil M0](10-M0-VERIFICATION.md) dan [Git workflow](09-GIT-WORKFLOW.md).

Proses pengembangan mengikuti siklus kecil TDD dari buku Test-Driven React yang diberikan pengguna. [Alur TDD](08-TDD-WORKFLOW.md) membedakan prinsip buku dan adaptasi Vitest/React Testing Library. Runner disiapkan sebelum fitur, tes memandu setiap perubahan perilaku, dan tahap akhir mengaudit regresi serta bukti proses. Siklus M0–M4 dan perbaikan review sudah dicatat dalam log/evidence; kasus yang langsung green ditandai confirmation.

## Ringkasan yang harus dipertahankan

- Satu halaman untuk admin demo: ambil maksimal 50 produk → cari/filter → edit stok → simpan melalui PATCH.
- API DummyJSON; perubahan tidak disimpan permanen di server. Hasil sukses dipertahankan dalam state React selama sesi.
- Pencarian dan filter hanya mencakup produk yang dimuat. Stok rendah adalah aturan demo: stok < 10.
- Tidak ada login, backend sendiri, grafik, CRUD lengkap, atau pagination pada baseline.
- Prioritas: alur inti benar, kegagalan tertangani, kode dipahami, kemudian visual.
- Jangan membuka atau mengoperasikan browser/computer use tanpa persetujuan pengguna. Pengujian visual interaktif memerlukan persetujuan tersebut; pengujian otomatis tanpa browser dan build dapat dilakukan sesuai izin lingkungan.

## Fakta sumber dan hal yang belum diverifikasi

- [DummyJSON Products](https://dummyjson.com/docs/products): data produk dan PATCH tersedia; update hanya simulasi.
- [React Managing State](https://react.dev/learn/managing-state): struktur state dan menghindari state duplikat.
- [React useEffect](https://react.dev/reference/react/useEffect): sinkronisasi eksternal, dependencies, cleanup.
- [Testing Library](https://testing-library.com/docs/guiding-principles/): testing yang mengikuti perilaku pengguna.

GET/PATCH nyata, HTTP lokal, origin header API, tes dan build telah diverifikasi. Browser internal gagal startup dua kali; pemilik kemudian mengizinkan Chrome DevTools terpisah. Browser execution, real GET/PATCH, retry/reload, keyboard dan layout 1365px/360px sudah diverifikasi dalam konteks Chromium tersebut. Estimasi lima jam adalah anggaran kerja, bukan durasi yang sudah terbukti. Waktu yang benar-benar tersedia belum dikonfirmasi.

## Aturan perubahan dan handoff

Ubah requirement di PRD terlebih dahulu, kemudian perbarui dokumen terdampak dengan ID requirement yang sama. Keputusan teknis milik TRD; aturan visual milik DBD; progres dan hasil uji milik IPD. Catat perubahan scope dan keterbatasan yang tersisa di bagian handoff IPD agar sesi berikutnya tidak mengisi celah dengan asumsi.
