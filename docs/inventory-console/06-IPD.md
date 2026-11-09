# IPD Inventory Operations Console

Status: implementasi fitur selesai; 63 tes dan build lulus. T25 (browser) dan T29 (pemahaman pemilik) WAITING. Lihat [handoff akhir](14-FINAL-HANDOFF.md); jangan menyebut seluruh milestone terverifikasi penuh.

Breakdown pelaksanaan: [Milestone dan task](07-MILESTONES-AND-TASKS.md), berisi enam milestone dan 30 task. IPD tetap menjadi ringkasan progres dan bukti requirement; ledger pada breakdown mencatat progres setiap task.

Keputusan proses 0.2: gunakan [Alur TDD](08-TDD-WORKFLOW.md) berdasarkan prinsip Test-Driven React, dengan adaptasi tooling yang dijelaskan di sana. Setiap perilaku dikembangkan lewat tes Red → implementasi minimal Green → refactor/tes ulang. Bukti urutan dicatat sejak awal, bukan direkonstruksi setelah fitur selesai.

## Rencana kerja hasil sintesis

Anggaran: empat jam pembangunan/verifikasi dan satu jam memahami kode serta latihan. Estimasi belum tervalidasi terhadap kecepatan pengerjaan pemilik. Baca [README](README.md) sebelum mulai.

| Tahap | Anggaran | Hasil yang dituju | Status |
| --- | --- | --- | --- |
| P1 | 60 menit | Runner dahulu; siklus TDD GET/tabel/loading/error; GET nyata | Selesai |
| P2 | 60 menit | Siklus TDD pencarian/filter, editor dan validasi | Selesai |
| P3 | 60 menit | Siklus TDD PATCH/pending/gagal/konsistensi; PATCH nyata | Selesai |
| P4 | 60 menit | Audit regresi dan log TDD, refactor aman, build, review visual bila diizinkan | Kode/tes selesai; T25 WAITING |
| P5 | 60 menit | Review pemahaman, catat keterbatasan, latihan demo tiga menit | Review/dokumen selesai; T29 WAITING |

P1 menjadi gerbang: jika koneksi/setup belum berjalan pada akhir anggaran, selesaikan masalah itu sebelum menambah fitur. Jika waktu menyempit, usulkan pengurangan filter stok rendah terlebih dahulu; tandai R02/R06 hanya terpenuhi sebagian. Jangan diam-diam menghapus requirement. Jika API tidak dapat diakses, fixture berlabel hanya boleh disebut mode demo offline, bukan bukti integrasi API nyata.

## Checklist verifikasi

Kotak kosong berarti belum ada bukti lulus. Saat dijalankan, catat perintah/metode, hasil, dan tanggal pada kolom bukti.

| Cek | Requirement | Status | Bukti |
| --- | --- | --- | --- |
| GET nyata dan data sesuai kontrak | R01 | [x] | M1, real GET 50, report 11 |
| Loading, gagal muat, retry, API kosong | R05 | [x] | T06/T07/T23 tests |
| Query trim/case-insensitive dan filter gabungan; reset | R02 | [x] | T10/T11 tests |
| 0 valid; kosong, negatif, desimal ditolak tanpa PATCH | R03 | [x] | T13 tests and parseStock cases |
| PATCH nyata dengan respons sesuai; GET server tetap semula | R04/R07 | [x] | T19 real API JSON evidence |
| Reload aplikasi pada browser kembali ke data API | R07 | [ ] | T25 WAITING; fresh-mount tests pass |
| Submit ganda/edit/batal terkunci saat menyimpan | R04 | [x] | T17/T18 tests |
| Gagal simpan mempertahankan input dan tabel lama | R05 | [x] | T17/T18 failure and retry |
| Sukses memperbarui tabel/filter dan pesan tetap terlihat | R06 | [x] | T16/T18 integration tests |
| Timeout dan respons JSON/shape invalid ditangani | R05 | [x] | T04/T14/T23 API and UI tests |
| Label, fokus, keyboard di DOM; static contrast | R08 | [x] | T21/T22 tests; M4 contrast evidence |
| Layout/keyboard nyata pada desktop dan layar kecil | R08 | [ ] | T25 WAITING; CSS implemented, not visually verified |
| Automated test dan build lulus | R02–R06 | [x] | 63 tests, six files, build passes; M4 evidence |

Minimal tes otomatis: gabungan pencarian/filter; validasi form; simpan sukses dan gagal dengan jaringan dimock. Tes mock tidak menggantikan pemeriksaan API nyata. Jangan memakai browser/computer use tanpa persetujuan pengguna; jika belum diizinkan, catat pemeriksaan visual/keyboard masih tertunda.

Tes perilaku di atas dibuat sebelum implementasi terkait pada P1–P3. P4 mengaudit dan melengkapi celah dengan siklus TDD; bukan tahap pertama menulis tes. Bukti T03-C01 sudah ada di log Alur TDD dan laporan M0. Anggaran lima jam tetap perlu dievaluasi di setiap gerbang; jangan menyamakan waktu menyiapkan repo/workflow dengan perkiraan kecepatan fitur React.

## Latihan demo tiga menit

1. Jelaskan pengguna dan tujuan operasional, lalu batas data 50 produk serta penyimpanan simulasi.
2. Cari produk, aktifkan filter, edit stok, simpan, tunjukkan perubahan hasil.
3. Tunjukkan validasi dan bukti tes kegagalan API yang benar-benar sudah dijalankan.
4. Jelaskan letak state, alasan Effect untuk GET, event handler untuk PATCH, dan mengapa tidak memakai global state library.

Jika menggunakan AI, catat kontribusinya secara akurat dan pastikan pemilik bisa menjelaskan perubahan kode. Prototipe bukan bukti pengalaman React production.

## Handoff sesi berikutnya

- Implementasi: loading/search/filter/editor/PATCH/recovery lengkap. Tidak ada deployment.
- Hasil: 63 tes lulus, build lulus, real GET/PATCH dan origin header diverifikasi; semua milestone code PR sudah melalui required CI dan squash merge.
- Review: tiga temuan kode diselesaikan dengan tes regresi; reviewer mengonfirmasi perbaikan, tanpa klaim visual.
- T25: browser internal diizinkan tetapi alat gagal startup dua kali; alternatif browser masih menunggu izin.
- T29: panduan dan pertanyaan latihan tersedia; jawaban pemilik belum diterima.
- Tugas berikutnya: dua verifikasi tersebut, bukan membangun ulang fitur. Baca [handoff akhir](14-FINAL-HANDOFF.md), [browser check](13-BROWSER-CHECK.md), dan [panduan demo](12-DEMO-AND-LEARNING-GUIDE.md).
