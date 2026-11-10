# Alur TDD Inventory Operations Console

Status: keputusan proses versi 0.2, 9 November 2026. Siklus T03-C01 sudah dijalankan; bukti lengkap di [laporan M0](10-M0-VERIFICATION.md). Berlaku untuk [milestone dan task](07-MILESTONES-AND-TASKS.md); scope produk tetap mengikuti PRD.

## Fakta dari buku rujukan

Sumber: Trevor Burnham, Test-Driven React, versi P1.0, Juni 2019, [PDF milik pengguna](D:/library/Test-Driven%20React.pdf). Nomor halaman cetak dan urutan halaman PDF berbeda; locator berikut sudah diperiksa pada file yang diberikan.

| Bagian | Halaman cetak | Urutan halaman PDF | Prinsip yang digunakan |
| --- | --- | --- | --- |
| The Tao of Test-Driven Development | 9–11 | 23–25 | Iterasi singkat; mulai dari satu tes, referen/stub minimal, amati kegagalan, implementasikan perilaku |
| Mantra Red Green Repeat | 14–15 | 28–29 | Selesaikan satu requirement kecil, ulangi; lakukan refactor dengan umpan balik tes |
| Testing Simple Components with Enzyme | 61 | 75 | Buku menggunakan Enzyme dan membahas alternatif react-testing-library |
| Mantra Test One Piece at a Time | 87 | 101 | Buku memilih pengujian komponen secara terisolasi |

Pengantar buku, halaman cetak xi (PDF 12), menyatakan contoh tesnya berupa unit test. Jangan mengatribusikan seluruh strategi integrasi proyek ini kepada buku.

## Keputusan adaptasi proyek hasil sintesis

- Pertahankan React/Vite, Vitest, React Testing Library, user-event, dan jsdom sesuai TRD. Kita mengikuti siklus dan ukuran langkah buku; tidak menyalin konfigurasi Jest/Enzyme, shallow rendering, class component, HOC, Styled Components, Travis, atau Storybook dari contohnya.
- Mulai dari unit kecil pada API/validasi dan tes komponen terarah; tambahkan beberapa tes interaksi halaman untuk membuktikan sambungan antarbagian. Ini adaptasi proyek, bukan penerapan identik pendekatan isolasi buku.
- Assert perilaku melalui input, output, DOM, dan request; jangan mengunci nama state atau struktur internal. Mock jaringan; mock callback pada tes komponen terisolasi. Pada tes halaman, jangan mock komponen anak yang perilakunya sedang dibuktikan.
- Tidak ada target coverage 100% untuk demo ini. Coverage, jika dikumpulkan, menjadi petunjuk celah, bukan bukti semua requirement benar.
- Struktur komponen pada TRD adalah baseline awal. Refactor boleh memperbaiki struktur setelah Green tanpa menambah fitur atau mengubah kontrak diam-diam.

## Siklus wajib per perilaku

1. Pilih **satu** perilaku dari task dan sebutkan requirement-nya. Jangan menulis seluruh fitur dan suite sekaligus.
2. **Red:** tulis tes terkecil, jalankan, dan catat assertion yang gagal karena perilaku belum ada. Stub/export/komponen kosong minimal boleh dibuat agar tes dapat dijalankan. Error install, import salah, syntax, atau runner rusak bukan bukti Red perilaku; benahi harness lalu jalankan lagi.
3. **Green:** ubah kode produksi secukupnya untuk memenuhi perilaku itu; jalankan tes terarah dan tes terkait yang sudah ada. Jangan mengubah expectation agar cocok dengan bug.
4. **Refactor:** rapikan hanya bila ada alasan konkret, lalu jalankan tes terkait lagi. Jika belum perlu refactor, tulis alasannya; tidak wajib menambah abstraksi.
5. Catat bukti dan baru pilih perilaku berikutnya. Jalankan suite penuh pada gerbang milestone dan build sesuai IPD.

Jika tes baru langsung lulus karena perilaku sudah didukung, catat sebagai tes konfirmasi, bukan Red yang direkayasa. Jangan sengaja merusak implementasi lalu mengklaim test-first. Pilih requirement berikutnya yang belum didukung; simpan konfirmasi tersebut bila menambah nilai regresi.

Bug yang ditemukan pada pemeriksaan nyata/manual: reproduksi → tes regresi gagal bila perilakunya dapat diuji otomatis → perbaikan minimal → jalankan ulang tes. Jangan menunda tes tersebut sampai akhir milestone.

## Batas TDD dan verifikasi lain

- Setup paket, entry point, dan konfigurasi runner: bootstrap; cek runner/build, tidak perlu tes kosmetik untuk setiap file konfigurasi.
- CSS visual/responsiveness/kontras: bukan klaim TDD dari jsdom. Perilaku DOM/keyboard/status tetap test-first; tampilan nyata diperiksa terpisah setelah izin browser tersedia.
- GET/PATCH nyata: contract smoke check sesudah tes mock; bukan tes Red yang bergantung pada jaringan publik.
- Penulisan dokumentasi dan latihan interview: review berbasis checklist, bukan siklus TDD.
- Tes green tidak membuktikan persistensi server, aksesibilitas penuh, atau integrasi browser. Gunakan bukti terpisah di IPD.

## Bukti dan handoff per task

Tambahkan satu baris per siklus di tabel berikut ketika benar-benar dijalankan. ID siklus: T04-C01, T04-C02, dan seterusnya. Ringkas output; jangan menyimpan dump data API. Bukti bisa berupa output terminal yang tercatat atau file log lokal berisi hasil aktual.

| Siklus / requirement / tanggal | Perilaku dan tes | Red: perintah, assertion gagal aktual | Green: perintah dan hasil aktual | Refactor atau alasan tidak perlu; hasil tes ulang |
| --- | --- | --- | --- | --- |
| T03-C01 / R07 / 9 November 2026 | InventoryPage.test.jsx: batas penyimpanan sesi terlihat | npm run test:run -- src/pages/InventoryPage.test.jsx; 1 failed, teks pemberitahuan tidak ditemukan | npm run test:run; 1 passed setelah pemberitahuan ditambahkan | Tidak perlu abstraksi tambahan pada halaman kecil; suite 1 passed dan build lulus; lihat laporan M0 |

Task perilaku baru dianggap DONE setelah siklus relevannya selesai dan bukti ditautkan dari ledger. Task audit tidak boleh mengklaim TDD secara retrospektif; periksa bukti task pembentuknya. Jangan menyerahkan task berikutnya pada keadaan Red. Jika sesi terhenti saat Red, tandai DOING dan handoff nama tes serta alasan gagal, bukan DONE.

Tidak wajib membuat commit untuk setiap Red/Green. Jangan menginisialisasi, commit, push, atau menghubungkan layanan hanya karena ada contoh perintah tersebut di buku; buku dipakai sebagai bahan rujukan proses.

## Contoh rancangan siklus tanpa klaim hasil

T13-C01: tes submit kosong tidak memanggil onSave dan menampilkan error → amati Red → implementasikan validasi kosong → Green → tinjau duplikasi. Lanjutkan siklus berbeda untuk 0 diterima, negatif ditolak, dan batas safe integer. Ini rencana pengujian, belum bukti eksekusi.

## Gerbang peninjauan

Reviewer membaca hasil tes dan urutannya, bukan hanya jumlah tes terakhir. Jika bukti Red tidak tersedia, tandai TDD belum terverifikasi meskipun fungsi dan tes akhirnya lulus. Anggaran lima jam tetap asumsi perencanaan yang diuji lewat waktu aktual; jangan menghilangkan Red atau menyebut tes belakangan sebagai TDD untuk mengejar anggaran.

## M1 observed cycles

T04-C01–C04: GET success, HTTP failure, data validation and timeout each observed Red then Green. Invalid JSON and caller abort are confirmation tests. T06-C01–C03: loading, count and error/retry observed Red/Green; cleanup/late result is confirmation. T07-C01–C03: table, page integration and API-empty state observed Red/Green. Details: evidence/ files. No extra abstraction after Green beyond requestJson.

## M2 observed cycles

T09-C01 controlled filters, T10-C01 combined search/filter, T12-C01 editor selection, T13-C01 valid zero submit and T13-C02 empty validation each observed Red/Green. Product switching/cancel and numeric boundaries already passed after the general rules; labelled confirmation in evidence. Refactor extracted parseStock for the safe-integer rule; no extra state library.

## M3 observed cycles

T14-C01–C03 PATCH request, save-specific HTTP error, and invalid confirmation; T16-C01 page save; T17-C01 pending controls; T17-C02 failure/retry all observed Red/Green. Integration/teardown and shared timeout/JSON paths are confirmation tests. A misplaced hook during T16 implementation was caught by the suite and fixed before Green. Red matcher was corrected to accept the actual jest-dom assertion format for T17. Removed the temporary M2 saveEnabled flag after PATCH was connected. Evidence files retain actual outcomes.

## M4 observed cycles

T21-C01 focus lifecycle and T21-C02 busy semantics observed Red/Green. T22/T23 audited existing regressions and added passing confirmation cases for keyboard and error recovery. A fresh code review found three issues: max-50 cap, live result counts, and native error messages. M4-R01/R02/R03 each observed Red then Green. Reviewer recheck marked all three resolved in code, with no browser/visual claim. Refactor kept simple components and no new library.

## T25 visual regression

Actual browser keyboard focus exposed a clipped table outline (offset 3px outside an overflow-hidden parent). Fixed with outline-offset:-4px and verified in desktop/mobile screenshots. This is the documented visual-CSS exception, not a claimed jsdom Red/Green cycle. Existing 63 tests and build pass after the fix; report 13 records the evidence.
