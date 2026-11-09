# IPD Inventory Operations Console

Status: dokumentasi baseline 0.1 selesai; implementasi dan semua verifikasi berikut **belum dijalankan**.

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

Tes perilaku di atas dibuat sebelum implementasi terkait pada P1–P3. P4 mengaudit dan melengkapi celah dengan siklus TDD; bukan tahap pertama menulis tes. Catat juga hasil Red/Green/refactor nyata di log Alur TDD. Belum ada bukti siklus atau estimasi waktu aktual; anggaran lima jam perlu dievaluasi di setiap gerbang.

## Latihan demo tiga menit

1. Jelaskan pengguna dan tujuan operasional, lalu batas data 50 produk serta penyimpanan simulasi.
2. Cari produk, aktifkan filter, edit stok, simpan, tunjukkan perubahan hasil.
3. Tunjukkan validasi dan bukti tes kegagalan API yang benar-benar sudah dijalankan.
4. Jelaskan letak state, alasan Effect untuk GET, event handler untuk PATCH, dan mengapa tidak memakai global state library.

Jika menggunakan AI, catat kontribusinya secara akurat dan pastikan pemilik bisa menjelaskan perubahan kode. Prototipe bukan bukti pengalaman React production.

## Handoff sesi berikutnya

- Pekerjaan terakhir: membuat dokumentasi dan breakdown enam milestone/30 task; menyesuaikan proses task menjadi TDD serta menambahkan panduan dan log bukti berbasis buku.
- File aplikasi: belum dibuat dalam pekerjaan ini.
- Tugas berikutnya: T01 pada M0 (awal P1); inspeksi folder dan instruksi terbaru sebelum setup agar tidak menimpa pekerjaan lain.
- Keputusan terbuka: waktu persiapan aktual, zona waktu undangan, koneksi API dari aplikasi lokal, versi paket kompatibel, izin pengujian browser, dan kebutuhan publikasi demo.
- Hasil pengujian: belum tersedia.
- Perubahan scope/bug tersisa: belum ada implementasi untuk dinilai; perbarui bagian ini setelah setiap tahap.
