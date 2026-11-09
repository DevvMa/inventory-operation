# IPD Inventory Operations Console

Status: T01–T03/M0 selesai; [bukti verifikasi M0](10-M0-VERIFICATION.md). Fitur API dan inventory pada M1–M5 belum dikerjakan.

Breakdown pelaksanaan: [Milestone dan task](07-MILESTONES-AND-TASKS.md), berisi enam milestone dan 30 task. IPD tetap menjadi ringkasan progres dan bukti requirement; ledger pada breakdown mencatat progres setiap task.

Keputusan proses 0.2: gunakan [Alur TDD](08-TDD-WORKFLOW.md) berdasarkan prinsip Test-Driven React, dengan adaptasi tooling yang dijelaskan di sana. Setiap perilaku dikembangkan lewat tes Red → implementasi minimal Green → refactor/tes ulang. Bukti urutan dicatat sejak awal, bukan direkonstruksi setelah fitur selesai.

## Rencana kerja hasil sintesis

Anggaran: empat jam pembangunan/verifikasi dan satu jam memahami kode serta latihan. Estimasi belum tervalidasi terhadap kecepatan pengerjaan pemilik. Baca [README](README.md) sebelum mulai.

| Tahap | Anggaran | Hasil yang dituju | Status |
| --- | --- | --- | --- |
| P1 | 60 menit | Runner dahulu; siklus TDD GET/tabel/loading/error; GET nyata | Belum mulai |
| P2 | 60 menit | Siklus TDD pencarian/filter, editor dan validasi | Belum mulai |
| P3 | 60 menit | Siklus TDD PATCH/pending/gagal/konsistensi; PATCH nyata | Belum mulai |
| P4 | 60 menit | Audit regresi dan log TDD, refactor aman, build, review visual bila diizinkan | Belum mulai |
| P5 | 60 menit | Review pemahaman, catat keterbatasan, latihan demo tiga menit | Belum mulai |

P1 menjadi gerbang: jika koneksi/setup belum berjalan pada akhir anggaran, selesaikan masalah itu sebelum menambah fitur. Jika waktu menyempit, usulkan pengurangan filter stok rendah terlebih dahulu; tandai R02/R06 hanya terpenuhi sebagian. Jangan diam-diam menghapus requirement. Jika API tidak dapat diakses, fixture berlabel hanya boleh disebut mode demo offline, bukan bukti integrasi API nyata.

## Checklist verifikasi

Kotak kosong berarti belum ada bukti lulus. Saat dijalankan, catat perintah/metode, hasil, dan tanggal pada kolom bukti.

| Cek | Requirement | Status | Bukti |
| --- | --- | --- | --- |
| GET nyata dan data sesuai kontrak | R01 | [ ] | Belum diuji |
| Loading, gagal muat, retry, API kosong | R05 | [ ] | Belum diuji |
| Query trim/case-insensitive dan filter gabungan; reset | R02 | [ ] | Belum diuji |
| 0 valid; kosong, negatif, desimal ditolak tanpa PATCH | R03 | [ ] | Belum diuji |
| PATCH nyata dengan respons sesuai; reload kembali ke data API | R04/R07 | [ ] | Belum diuji |
| Submit ganda/edit/batal terkunci saat menyimpan | R04 | [ ] | Belum diuji |
| Gagal simpan mempertahankan input dan tabel lama | R05 | [ ] | Belum diuji |
| Sukses memperbarui tabel/filter dan pesan tetap terlihat | R06 | [ ] | Belum diuji |
| Timeout dan respons JSON/shape invalid ditangani | R05 | [ ] | Belum diuji |
| Label, fokus, keyboard dan layar kecil | R08 | [ ] | Belum diuji |
| Automated test dan build lulus | R02–R06 | [ ] | Belum diuji |

Minimal tes otomatis: gabungan pencarian/filter; validasi form; simpan sukses dan gagal dengan jaringan dimock. Tes mock tidak menggantikan pemeriksaan API nyata. Jangan memakai browser/computer use tanpa persetujuan pengguna; jika belum diizinkan, catat pemeriksaan visual/keyboard masih tertunda.

Tes perilaku di atas dibuat sebelum implementasi terkait pada P1–P3. P4 mengaudit dan melengkapi celah dengan siklus TDD; bukan tahap pertama menulis tes. Bukti T03-C01 sudah ada di log Alur TDD dan laporan M0. Anggaran lima jam tetap perlu dievaluasi di setiap gerbang; jangan menyamakan waktu menyiapkan repo/workflow dengan perkiraan kecepatan fitur React.

## Latihan demo tiga menit

1. Jelaskan pengguna dan tujuan operasional, lalu batas data 50 produk serta penyimpanan simulasi.
2. Cari produk, aktifkan filter, edit stok, simpan, tunjukkan perubahan hasil.
3. Tunjukkan validasi dan bukti tes kegagalan API yang benar-benar sudah dijalankan.
4. Jelaskan letak state, alasan Effect untuk GET, event handler untuk PATCH, dan mengapa tidak memakai global state library.

Jika menggunakan AI, catat kontribusinya secara akurat dan pastikan pemilik bisa menjelaskan perubahan kode. Prototipe bukan bukti pengalaman React production.

## Handoff sesi berikutnya

- Pekerjaan terakhir: menyelesaikan T01–T03/M0, menyiapkan Git workflow, dan menyiapkan PR fondasi.
- File aplikasi: entry React, InventoryPage, tes pemberitahuan sesi, fixture tes, konfigurasi Vite/Vitest, serta lockfile.
- Tugas berikutnya: T04 pada M1; periksa status PR M0 dan ledger sebelum melanjutkan.
- Keputusan terbuka: waktu persiapan aktual, zona waktu undangan, koneksi API dari aplikasi lokal, versi paket kompatibel, izin pengujian browser, dan kebutuhan publikasi demo.
- Hasil pengujian: 1 tes fitur lulus setelah Red; probe runner gagal/lulus dan dihapus; build lulus; HTTP lokal 200. Lihat laporan M0.
- Perubahan scope/bug tersisa: fitur GET/PATCH, filter/editor, layout, dan verifikasi browser belum ada. Semua requirement inventory pada checklist di atas tetap belum dicentang; M0 hanya membuktikan fondasi dan pemberitahuan sesi.
