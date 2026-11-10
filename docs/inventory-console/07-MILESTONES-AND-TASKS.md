# Milestone dan task Inventory Operations Console

Tanggal baseline: 9 November 2026. Revisi proses 0.2: TDD berdasarkan buku Test-Driven React. Status: Semua task teknis **DONE**; T29 **DEFERRED** atas permintaan pemilik untuk sesi belajar terpisah. Lihat 14-FINAL-HANDOFF.md untuk batas bukti. Bukti: [laporan M0](10-M0-VERIFICATION.md). Dokumen ini memecah rencana [IPD](06-IPD.md); tidak mengganti requirement atau menandakan seluruh implementasi sudah selesai.

## Dasar dan batas pekerjaan

**Fakta dari dokumentasi dan pemeriksaan folder:** proyek direncanakan sebagai satu halaman React, menggunakan DummyJSON, tanpa backend sendiri. Saat breakdown dibuat, root proyek hanya berisi folder docs; belum ada package.json atau kode aplikasi. Bukti perilaku aplikasi belum tersedia.

**Hasil sintesis perencanaan:** milestone, pembagian file, kontrak fungsi internal, urutan tugas, serta checkpoint di bawah merupakan rancangan pelaksanaan. Lima jam adalah anggaran dari IPD, bukan estimasi yang sudah terbukti cocok untuk junior atau model tertentu. Ukur progres pada akhir setiap milestone dan catat sisa pekerjaan secara jujur.

Sumber utama:

- [PRD](01-PRD.md): R01–R08 dan B01; aturan bisnis hanya diubah di sini terlebih dahulu.
- [TRD](02-TRD.md): stack, state, API, validasi, error handling.
- [AFD](03-AFD.md): alur, reset draft, perpindahan fokus, dan pemulihan.
- [DBD](04-DBD.md): layout, label, status visual, aksesibilitas.
- [BSD](05-BSD.md): simulasi backend, tanpa persistensi server.
- [README](README.md): ringkasan konteks dan batas penggunaan browser.
- [Alur TDD](08-TDD-WORKFLOW.md): fakta buku beserta locator halaman, adaptasi tooling, siklus Red → Green → Refactor, dan log bukti.

Tidak menambahkan login, router, Redux, backend, database, grafik, pagination, localStorage, CRUD lengkap, atau deployment. Jangan memanggil data mock sebagai hasil integrasi nyata. Jangan memakai browser/computer use tanpa persetujuan pengguna; tes DOM melalui jsdom dan build tidak memerlukan kontrol browser.

## Cara memberikan satu task kepada pelaksana

Berikan satu ID task per giliran. Task berikutnya baru dimulai setelah dependensinya memiliki bukti selesai. Pembagian ini tidak memerintahkan eksekusi paralel; parent page, konfigurasi, dan CSS mudah berbenturan jika diubah bersamaan.

Paket konteks minimum: baca ringkasan di atas, kontrak di bawah, Alur TDD, bagian milestone yang memuat task, dan dokumen sumber yang disebut pada task. Sertakan hasil handoff dependensi agar pelaksana tidak menebak interface yang sudah dibuat.

Template instruksi yang dapat disalin:

```text
Kerjakan hanya task Txx dalam docs/inventory-console/07-MILESTONES-AND-TASKS.md.
Baca sumber dan handoff dependensinya. Periksa file aktual sebelum mengedit.
Pertahankan scope, interface, serta requirement baseline. Jangan menimpa docs.
Jangan mengoperasikan browser tanpa persetujuan pengguna.
Untuk perilaku baru: satu tes → buktikan Red yang relevan → implementasi minimal
→ Green → refactor bila perlu → tes ulang. Ulangi per perilaku kecil.
Jangan menulis fitur penuh sebelum tes. Task audit hanya memeriksa bukti;
bug baru harus diawali tes regresi gagal bila dapat diuji otomatis.
Selesaikan output dan pemeriksaan yang tercantum. Jika terhalang, catat bukti
dan bagian yang belum selesai; jangan mengarang hasil atau memperluas scope.
Kembalikan: file berubah, perilaku yang diubah, hasil pemeriksaan, batas yang
belum diverifikasi, dan task berikutnya. Perbarui baris ledger task ini dan
log siklus aktual dalam 08-TDD-WORKFLOW.md. Jangan mengarang hasil Red/Green.
```

## Aturan TDD untuk seluruh task

Sebelum setiap perubahan perilaku dalam T03/T04/T06/T07/T09/T10/T12/T13/T14/T16/T17/T18/T21, tulis dan jalankan satu tes yang menunjukkan perilaku itu belum ada. Batas file task tersebut otomatis mencakup file tes terkait. Implementasikan hanya perilaku yang sedang Red, jalankan kembali, lalu refactor bila perlu. Kriteria selesai lama tetap berlaku ditambah bukti siklus TDD.

T05/T11/T15/T22/T23 menjadi audit kelengkapan serta penutupan celah test-first, bukan tempat pertama kali menulis tes untuk fitur yang sudah dibuat. T18 menguji sambungan antarbagian; jika kasusnya sudah green, catat sebagai konfirmasi tanpa mengarang riwayat Red. T01/T02 adalah bootstrap; T08/T19 adalah pemeriksaan API nyata; T20/T25 memuat review visual; T24/T26–T30 adalah gerbang/review/handoff. Batas rinci dan log bukti ada di [Alur TDD](08-TDD-WORKFLOW.md).

## Kontrak implementasi agar task tidak saling menebak

Ini keputusan pelaksanaan hasil sintesis. Jika perlu diubah, perbarui kontrak ini dan TRD sebelum task yang bergantung padanya diteruskan.

| Bagian | Kontrak |
| --- | --- |
| Lokasi | Aplikasi Vite di root, source di src; dokumentasi tetap di docs/inventory-console |
| api/products.js | getProducts({signal} = {}) menghasilkan array Product; updateStock(id, stock, {signal} = {}) menghasilkan {id, stock}; keduanya throw pada kegagalan |
| Product | {id, title, category, price, stock}; validasi data mengikuti TRD |
| InventoryPage | Memiliki products, loadStatus, loadError, query, lowStockOnly, selectedProductId, isSaving, successMessage |
| InventoryFilters | Props query, lowStockOnly, onQueryChange, onLowStockChange, onReset; ref input pencarian untuk fokus ditangani sesuai versi React terpasang |
| ProductTable | Props products, editingDisabled, onEdit; list key memakai id |
| StockEditor | Props product, isSaving, onSave, onCancel; key=product.id; draftStock string, fieldError/saveError lokal |
| onSave(stock) | Promise; parent mengirim PATCH dan memperbarui products secara immutable hanya saat sukses; resolve saat sukses, reject saat gagal agar editor menampilkan saveError |
| Data turunan | visibleProducts, selectedProduct, dan jumlah hasil dihitung; tidak membuat state salinan |
| Filter | title.toLowerCase() memuat query.trim().toLowerCase(); lowStockOnly berarti stock < 10; pencarian dan filter memakai AND |
| Harga | Angka dengan format konsisten; tanpa simbol atau asumsi mata uang |
| Sukses/gagal | Tidak ada optimistic update. Simpan sukses menutup editor; gagal mempertahankan editor/input dan products lama |

Data uji lokal yang disarankan: (1) Kopi A, stok 0; (2) Kopi B, stok 9; (3) Teh C, stok 10. Beri id unik, kategori string, harga finite. Ini fixture tes sintetis, bukan isi API nyata. Kombinasi query " KOPI " dan filter stok rendah harus menghasilkan dua produk; ubah stok Kopi B ke 12, hasil menjadi satu.

## Ringkasan milestone dan gerbang

| Milestone | Pemetaan IPD | Anggaran | Output dan gerbang |
| --- | --- | --- | --- |
| M0 Fondasi | Awal P1 | 20 menit | Runner sebelum fitur; tes pemberitahuan demo dan bukti Red/Green pertama |
| M1 Daftar API | Sisa P1 | 40 menit | GET/tabel/loading/retry dibangun lewat siklus kecil; GET nyata diperiksa |
| M2 Cari dan edit | P2 | 60 menit | Tes dahulu untuk kontrol, filter, editor, dan validasi; tanpa PATCH |
| M3 Simpan stok | P3 | 60 menit | Test-first PATCH/pending/gagal/konsistensi; pemeriksaan API nyata |
| M4 Kualitas | P4 | 60 menit | Audit regresi dan bukti TDD; refactor aman; build dan review visual bila diizinkan |
| M5 Handoff interview | P5 | 60 menit | Bukti proses serta hasil, keterbatasan, pemahaman, dan demo |

Anggaran mencakup integrasi serta verifikasi pada milestone, bukan janji waktu setiap task. Jika gerbang belum terpenuhi, catat hambatan sebelum meneruskan bagian yang bergantung padanya. Jangan mengejar semua fitur dengan menghapus verifikasi.

## M0 Fondasi

### T01 Periksa lingkungan dan siapkan aplikasi

- Dependensi: tidak ada. Sumber: README, TRD.
- Batas file: konfigurasi root, package.json/lockfile, src/main.jsx, src/App.jsx, index.html.
- Langkah: cek runtime dan file aktual; pilih versi React/Vite kompatibel; setup JavaScript/JSX tanpa scaffold yang menghapus docs. Pilih satu package manager dan pertahankan lockfile-nya.
- Selesai jika: entry React menampilkan judul; build awal lulus; docs tetap ada. Catat versi, perintah install/dev/build. Jika install terhalang jaringan, laporkan sebagai hambatan.

### T02 Siapkan runner tes

- Dependensi: T01. Sumber: TRD bagian Verifikasi.
- Batas file: konfigurasi Vitest/jsdom, setup tes, script test, dependensi tes.
- Langkah: pasang React Testing Library, user-event, dan matcher DOM yang kompatibel. Siapkan mode watch untuk umpan balik cepat serta mode sekali jalan. Pastikan cleanup dan mock dipulihkan antar tes. Baca Alur TDD sebelum fitur pertama.
- Selesai jika: runner terbukti mengeksekusi tes dan melaporkan assertion gagal/lulus melalui probe sementara yang kemudian dihapus. Ini verifikasi harness, bukan bukti Red fitur. Catat perintah watch dan sekali jalan; tidak perlu tes permanen untuk judul scaffold.

### T03 Buat kerangka halaman dan fixture tes

- Dependensi: T01, T02. Sumber: PRD R07, DBD hierarki halaman, BSD, Alur TDD.
- Batas file: InventoryPage.jsx, fixture di folder tes, App.jsx.
- Langkah: hubungkan InventoryPage; tampilkan judul, fungsi singkat, pemberitahuan penyimpanan sesi. Buat fixture tiga produk sesuai kontrak di atas.
- Siklus pertama: fixture dan stub minimal → tes pemberitahuan batas penyimpanan tidak ditemukan (Red) → render pemberitahuan (Green) → tinjau kode. Bukan sekadar snapshot scaffold.
- Selesai jika: pemberitahuan terlihat; fixture hanya dipakai pada tes dan tidak menjadi fallback diam-diam untuk API gagal.

## M1 Daftar API

### T04 Bangun pembacaan API secara test-first

- Dependensi: T01, T02. Sumber: TRD kontrak GET dan timeout, Alur TDD.
- Batas file: api/products.js.
- Langkah: implementasikan getProducts, cek HTTP, parsing JSON, array dan field produk. Terapkan timeout 10 detik, dukung signal dari pemanggil, bersihkan timer/listener.
- Urutan siklus: array valid → HTTP gagal → JSON invalid → shape invalid → timeout → caller abort/cleanup. Untuk setiap kasus, tes Red lebih dahulu; gunakan mock fetch dan timer terkendali. Jangan membangun seluruh request wrapper sebelum tes pertama.
- Selesai jika: array valid dikembalikan; HTTP gagal, JSON/shape invalid, serta timeout ditolak; abort cleanup dapat dibedakan dari timeout. Tidak membuat retry otomatis.

### T05 Audit bukti dan kelengkapan batas GET

- Dependensi: T02, T04. Sumber: TRD, PRD R01/R05.
- Batas file: tes api/products.
- Langkah: audit tes dan log siklus T04 untuk valid, HTTP gagal, JSON invalid, shape invalid, timeout, caller abort, dan URL limit/select. Jangan menduplikasi tes. Jika ada celah/bug, tulis satu tes Red sebelum perbaikan lalu Green/refactor. Kasus yang langsung lulus dicatat sebagai konfirmasi.
- Selesai jika: hasil/rejection sesuai kontrak; timeout tidak tertukar dengan abort cleanup; timer dan mock dibersihkan. Tes lulus tanpa jaringan nyata.

### T06 Hubungkan loading dan retry ke halaman

- Dependensi: T03, T04. Sumber: AFD alur memuat, TRD state.
- Batas file: InventoryPage.jsx.
- Langkah: GET di Effect dengan cleanup controller; status loading/ready/error; retry baru setelah gagal. Abaikan hasil request lama/yang dibatalkan. Hitung jumlah dari array aktual.
- Urutan siklus: status loading dengan Promise tertunda → sukses/jumlah → gagal/alert → retry sukses → unmount/abort dan hasil lama diabaikan. Masing-masing tes sebelum perubahan perilaku.
- Selesai jika: loading bukan empty state; abort saat cleanup tidak menampilkan error; error memiliki Coba lagi; retry dapat berhasil. Tes dan bukti dibuat di task ini; T23 hanya mengaudit kelengkapannya.

### T07 Render tabel dan data kosong

- Dependensi: T06. Sumber: PRD R01/R07, DBD tabel.
- Batas file: ProductTable.jsx, integrasi InventoryPage.jsx.
- Langkah: tampilkan kolom sesuai PRD; key=id; harga numerik konsisten; penanda stok rendah berupa teks; empty API berbeda dari gagal muat. Tombol edit disiapkan melalui callback untuk T12.
- Siklus: tes render satu produk/kolom → implementasi minimal; lanjut kasus harga tanpa mata uang, batas stok rendah, callback edit, dan data kosong. Gunakan callback mock saat komponen diuji terisolasi.
- Selesai jika: fixture valid dapat dirender dan array kosong menghasilkan pesan tepat; tidak menampilkan mata uang yang belum dikonfirmasi.

### T08 Periksa GET nyata dan gerbang M1

- Dependensi: T05–T07. Sumber: IPD P1, TRD endpoint.
- Batas: hasil verifikasi di ledger/IPD; perbaikan hanya pada masalah GET yang ditemukan.
- Langkah: lakukan request HTTP nyata melalui alat non-browser yang diizinkan; cek data memenuhi kontrak. Jalankan tes GET dan build. Catat tanggal/metode/hasil tanpa menyalin data yang tidak diperlukan.
- Selesai jika: bukti GET nyata ada, tes/build lulus. Request CLI bukan bukti CORS atau tampilan browser; catat keduanya belum terverifikasi. Jika jaringan dibatasi, tandai BLOCKED dan lanjutkan hanya task yang bisa memakai mock secara jujur.

## M2 Cari dan edit

### T09 Buat kontrol pencarian dan filter

- Dependensi: T03. Sumber: PRD R02, DBD.
- Batas file: InventoryFilters.jsx.
- Langkah: controlled input, checkbox, label, Reset filter dan dukungan ref pencarian. Gunakan kontrak props yang disepakati.
- Siklus: tes label/query dan callback input → Green; kemudian checkbox → Green; Reset → Green. Parent/callback sederhana menjadi harness; jangan mengetes state internal.
- Selesai jika: interaksi hanya mengirim callback; tidak melakukan fetch atau menyimpan salinan query di komponen ini.

### T10 Integrasikan hasil filter turunan

- Dependensi: T07, T09. Sumber: PRD R02/B01, TRD.
- Batas file: InventoryPage.jsx.
- Langkah: query dan checkbox di parent; hitung visibleProducts; tampilkan jumlah hasil/jumlah dimuat; sediakan reset; bedakan data kosong dengan hasil filter kosong.
- Siklus halaman: pencarian nama → trim/kapital → stok 0/9/10 → gabungan AND → hasil kosong → reset. Tulis/lihat Red satu kasus sebelum mengubah logikanya; refactor setelah Green.
- Selesai jika: query trim/case-insensitive dan filter memakai AND; tidak melakukan fetch tambahan saat mengetik; reset mengembalikan semua produk yang dimuat.

### T11 Audit regresi pencarian dan batas stok

- Dependensi: T02, T10. Sumber: PRD R02/B01.
- Batas file: tes interaksi InventoryPage.
- Langkah: audit tes/log T09/T10 dengan fixture tiga produk untuk query " KOPI ", gabungan, batas 0/9/10, kosong dan reset. Jalankan regresi; celah baru ditutup dengan siklus TDD, bukan implementasi dahulu.
- Selesai jika: jumlah serta baris hasil sesuai kontrak; tes tidak bergantung pada data API publik yang berubah.

### T12 Buat editor dan pemilihan produk

- Dependensi: T07, T10. Sumber: AFD Mengubah stok/Perubahan tampilan, TRD.
- Batas file: StockEditor.jsx dan pemilihan di InventoryPage.jsx.
- Langkah: simpan selectedProductId di parent; derive product; key editor memakai id; draft string; satu editor. Pilih produk lain membuang draft, batal tidak mengubah tabel; filter tidak menutup editor.
- Siklus: membuka produk dan draft awal → Green; pindah A ke B/reset draft → Green; batal tanpa mutasi → Green; filter menyembunyikan baris tetapi editor tetap ada → Green. Gunakan onSave mock; penyimpanan nyata belum dibuat.
- Selesai jika: nilai awal benar, pergantian produk mereset draft/error; petunjuk draft terlihat. Tahap ini belum mengirim PATCH; onSave disambungkan pada T17.

### T13 Tambahkan validasi stok dan tesnya

- Dependensi: T02, T12. Sumber: PRD R03, TRD validasi, AFD.
- Batas file: StockEditor.jsx, helper validasi bila diperlukan, tes StockEditor.
- Langkah: trim, tolak kosong, konversi dan cek safe integer >= 0; min=0, step=1; field error terhubung ke input. Uji 0 dan stok sama diterima; kosong/spasi, negatif, desimal, nonangka, infinity, dan di luar safe integer ditolak.
- Siklus: mulai tes submit kosong tidak memanggil onSave → Red/Green; tambah kasus valid 0 dan stok sama; lanjut setiap batas invalid secara terpisah. Uji nilai yang disanitasi input number pada helper domain bila DOM tidak dapat merepresentasikannya; jangan memaksa kondisi browser yang tidak mungkin.
- Selesai jika: invalid tidak memanggil onSave, draft tetap ada, fokus ke input. Tes menguji perilaku tanpa mengunci cara implementasi helper.

## M3 Simpan stok

### T14 Bangun PATCH secara test-first

- Dependensi: T04. Sumber: TRD kontrak PATCH.
- Batas file: api/products.js.
- Langkah: updateStock mengirim PATCH JSON stock; pakai perilaku HTTP/timeout/abort yang sama dengan GET. Periksa id dan stock respons sesuai request sebelum resolve.
- Siklus: request/hasil valid → Green; kemudian HTTP gagal, id mismatch, stock mismatch, respons invalid dan timeout. Tulis tes sebelum perubahan terkait; kasus bersama GET yang sudah bekerja dicatat sebagai konfirmasi, bukan Red palsu.
- Selesai jika: data mismatch/invalid ditolak; tidak menganggap HTTP 200 saja sebagai sukses; tidak mengambil seluruh produk ulang setelah PATCH.

### T15 Audit bukti dan kelengkapan kontrak PATCH

- Dependensi: T02, T14. Sumber: TRD, PRD R04/R05.
- Batas file: tes api/products.
- Langkah: audit tes dan bukti T14 untuk URL/method/header/body, valid, HTTP gagal, invalid, mismatch dan timeout. Tutup celah/bug melalui Red/Green/refactor; jangan membuat ulang suite yang sama.
- Selesai jika: semua kasus lulus; gunakan mock, tidak mengirim PATCH nyata dari suite otomatis.

### T16 Hubungkan simpan pada parent

- Dependensi: T06, T12, T14. Sumber: TRD state/onSave, PRD R04/R06.
- Batas file: InventoryPage.jsx.
- Langkah: onSave menangkap id produk aktif, mengunci penyimpanan, mengirim PATCH, dan memperbarui hanya stok produk itu secara immutable. Sukses menutup editor dan memberi pesan nama/stok. Gagal reject ke editor, data lama tetap; finally melepas lock. Cegah request kedua saat request pertama aktif, termasuk guard handler.
- Siklus halaman: belum berubah sebelum respons → sukses memperbarui satu produk → pesan tetap setelah editor tutup → gagal mempertahankan data → request ganda/teardown. Mulai setiap perubahan dari tes perilaku yang gagal; sambungkan editor minimal seperlunya agar alur nyata dapat diuji tanpa menguji state parent langsung. T17 melengkapi presentasi pending/gagal.
- Selesai jika: tidak ada optimistic update; properti produk lain tetap; teardown halaman tidak menghasilkan pesan sukses/error dari request yang sudah dibatalkan.

### T17 Hubungkan pending dan kegagalan ke editor

- Dependensi: T13, T16. Sumber: AFD, DBD kondisi.
- Batas file: StockEditor.jsx, prop editingDisabled pada ProductTable.
- Langkah: await onSave; tampilkan saveError saat reject; input/Simpan/Batal dan aksi edit lain disabled selama pending. Filter tetap aktif. Bersihkan error lama saat pengguna memperbaiki input/mencoba lagi.
- Siklus: pending mengunci kontrol → Green; gagal mempertahankan draft/alert → Green; retry sukses → Green; koreksi input membersihkan error → Green. Promise mock dapat ditahan/diselesaikan agar urutan perilaku teramati.
- Selesai jika: kegagalan mempertahankan draft dan stok lama; retry bisa berhasil; tidak ada unhandled rejection; klik berulang tidak menambah request.

### T18 Tutup celah integrasi simpan dengan siklus TDD

- Dependensi: T11, T15, T17. Sumber: PRD R04–R06, AFD.
- Batas file: tes interaksi InventoryPage/StockEditor.
- Langkah: delay respons mock; uji lock dan submit ganda. Ubah Kopi B dari 9 ke 12 saat filter stok rendah aktif; pastikan baris hilang, pesan sukses tetap. Uji gagal lalu retry, draft dipertahankan, tabel tidak berubah sebelum sukses, editor tetap terbuka saat filter berubah.
- Jangan menulis ulang tes T16/T17. Mulai dari tes gabungan filter+simpan; jika Red, perbaiki hanya sambungan yang hilang lalu Green/refactor. Jika langsung Green, catat konfirmasi integrasi; tidak mengarang Red dengan merusak kode.
- Selesai jika: semua perilaku teruji tanpa memeriksa state internal komponen.

### T19 Periksa PATCH nyata dan gerbang M3

- Dependensi: T15, T18; GET nyata T08 diperlukan untuk klaim integrasi lengkap. Sumber: BSD, IPD P3.
- Batas: bukti di ledger/IPD; perbaikan hanya masalah integrasi yang terbukti.
- Langkah: kirim satu PATCH stok pada id valid melalui HTTP non-browser; cek respons lalu GET produk itu kembali untuk memeriksa sifat simulasi. Jalankan tes terkait/build.
- Selesai jika: hasil aktual tercatat dan sesuai kontrak. Jika berbeda dari dokumentasi, catat perbedaan sebelum mengubah perilaku. Bukti persistensi reload di aplikasi tetap menunggu T25.

## M4 Kualitas dan pemeriksaan akhir

### T20 Terapkan layout responsif

- Dependensi: T10, T17. Sumber: DBD.
- Batas file: CSS dan class markup seperlunya.
- Langkah: font sistem, latar terang, aksen tunggal, jarak konsisten; editor di atas tabel pada layar kecil; scroll horizontal hanya pada wadah tabel; wrap nama panjang.
- Jenis verifikasi: styling visual, bukan klaim TDD melalui jsdom. Pertahankan tes perilaku yang sudah green; perubahan label/semantik/interaksi di luar CSS tetap dimulai dengan tes terkait.
- Selesai jika: struktur/style diterapkan tanpa mengubah aturan bisnis. Pemeriksaan visual nyata masih harus dilakukan pada T25; jangan menyebut layout terverifikasi hanya dari CSS.

### T21 Lengkapi fokus dan status aksesibel

- Dependensi: T09, T12, T17. Sumber: AFD, DBD, PRD R08.
- Batas file: komponen terkait dan tes interaksi.
- Langkah: fokus stok saat editor dibuka; fokus pencarian setelah batal/sukses; aria-invalid/describedby; role=status untuk sukses dan alert untuk gagal; focus ring dan header tabel semantik.
- Siklus: tes fokus saat buka → Green; fokus setelah batal/sukses → Green; hubungan field error dan status → Green, hanya untuk kasus yang belum didukung. Atribut yang sudah dibuat sebelumnya diaudit tanpa tes duplikat. Focus ring/kontras diverifikasi visual pada T25.
- Selesai jika: tes DOM membuktikan label/fokus/status dan navigasi tombol dasar. Jangan mengklaim aksesibilitas penuh atau kontras lulus sebelum T25.

### T22 Audit regresi pergantian dan pembatalan edit

- Dependensi: T13, T21. Sumber: AFD.
- Batas file: tes interaksi.
- Langkah: jalankan/audit tes T12/T13/T21 untuk draft A → B, reset error, batal tanpa mutasi, fokus kembali, serta filter tidak menutup editor. Kasus baru yang mengungkap bug wajib Red sebelum perbaikan; jangan menunda tes fitur T12 hingga task ini.
- Selesai jika: pergantian draft tidak bocor antarproduk dan perubahan belum tersimpan tidak mengubah tabel.

### T23 Audit regresi pemuatan dan pemulihan di UI

- Dependensi: T06, T07, T17. Sumber: PRD R05, AFD.
- Batas file: tes interaksi; perbaikan hanya kegagalan terkait.
- Langkah: audit tes/log T06/T07/T17 atas GET tertunda/kosong/gagal/retry, invalid/timeout, cleanup/hasil lama, serta PATCH gagal. Jangan menulis tes loading pertama di sini. Tutup bug baru melalui tes regresi Red sebelum perbaikan; kasus yang sudah lulus dicatat sebagai konfirmasi.
- Selesai jika: loading/data kosong/filter kosong/gagal tidak tertukar; setiap kondisi gagal memiliki jalur pemulihan yang sesuai.

### T24 Jalankan suite dan build

- Dependensi: T05, T11, T13, T15, T18, T20–T23.
- Batas: kode yang perlu diperbaiki karena kegagalan nyata dan catatan IPD.
- Langkah: jalankan semua tes sekali jalan dan build production; lint jika tersedia. Audit log Red/Green/refactor milestone sebelumnya. Untuk bug yang belum memiliki tes, tambahkan reproduksi Red sebelum memperbaiki; ulangi cek terdampak. Catat perintah, jumlah tes dan hasil aktual. Task ini bukan awal penulisan suite.
- Selesai jika: cek yang diwajibkan lulus; jangan menandai seluruh milestone lulus jika API nyata atau review visual masih tertunda.

### T25 Verifikasi manual dengan izin browser

- Dependensi: T19–T24 dan persetujuan pengguna untuk penggunaan browser. Sumber: DBD, IPD checklist.
- Batas: pemeriksaan aplikasi, koreksi bug yang ditemukan, catatan bukti.
- Langkah: setelah izin tersedia, periksa alur GET/PATCH dari browser dan CORS; reload mengembalikan data server; keyboard/fokus; lebar sekitar 360px dan desktop; kontras teks/kontrol. Catat metode/hasil dan kondisi gagal yang benar-benar dicoba.
- Jika ditemukan bug perilaku yang dapat direproduksi otomatis, buat tes regresi Red sebelum koreksi. Bug visual murni diperbaiki dan diverifikasi ulang secara visual, tanpa mengklaimnya sebagai TDD jsdom.
- Selesai jika: bukti tiap pemeriksaan tercatat. Jika izin belum ada, status WAITING, bukan PASS. Tes jsdom atau request CLI tidak menggantikan bukti visual/browser.

## M5 Handoff dan interview

### T26 Review kode dan pemetaan requirement

- Dependensi: T24; gunakan status aktual T08/T19/T25. Sumber: seluruh dokumen.
- Batas: review dan perbaikan inkonsistensi yang terbukti, tanpa refactor besar.
- Langkah: periksa R01–R08 satu per satu; state tidak duplikat, server write hanya dari submit, tidak ada persistensi palsu atau fitur di luar scope. Tinjau khusus abort vs timeout, guard request ganda, dan reset draft.
- Audit proses: pilih siklus API, validasi, dan interaksi; pastikan log membuktikan tes gagal sebelum implementasi, lalu Green dan keputusan refactor. Tes akhir green tanpa bukti urutan ditandai TDD belum terverifikasi.
- Selesai jika: setiap requirement diberi status terpenuhi/sebagian/belum terverifikasi dengan bukti. Kemampuan pelaksana atau lama pengalaman tidak disimpulkan dari test pass.

### T27 Perbarui handoff dan cara menjalankan

- Dependensi: T26. Sumber: README, IPD.
- Batas file: README proyek bila dibuat, README dokumentasi, IPD dan ledger ini.
- Langkah: tulis perintah setup/dev/test/build yang benar, versi paket, file penting, scope aktual, bug terbuka, bagian bantuan AI, dan bukti API nyata vs mock. Jangan menandai hasil yang belum diuji.
- Sertakan tautan log TDD aktual dan nyatakan adaptasi Vitest/RTL terhadap buku yang memakai Jest/Enzyme; jangan mengklaim seluruh metodologi isolasi buku diterapkan identik.
- Selesai jika: orang baru bisa melanjutkan dari file tanpa membaca seluruh chat. Timestamp bukti dan task berikutnya jelas.

### T28 Susun panduan demo singkat

- Dependensi: T27. Sumber: IPD latihan demo.
- Batas file: catatan demo di IPD.
- Langkah: tulis urutan tiga menit sesuai fitur yang benar-benar selesai: tujuan/batas → pencarian/filter → stok/validasi → simpan → bukti kegagalan dan keterbatasan. Pisahkan demo live dari bukti automated test.
- Pilih satu siklus Red/Green aktual untuk diceritakan: perilaku yang belum ada, tes yang gagal, perubahan minimal, dan keputusan refactor. Jangan merekayasa demo Red pada kode selesai sebagai riwayat pengembangan.
- Selesai jika: tidak menjanjikan fitur yang belum ada dan tidak menyamakan proyek latihan dengan pengalaman production.

### T29 Periksa pemahaman pemilik

- Dependensi: T28. Pelaksana: pemilik, dibantu model/reviewer.
- Langkah: pemilik menjelaskan lokasi state, alasan Effect vs event, immutable update, abort vs timeout, kegagalan API, dan alasan tidak memakai global state. Lakukan satu perubahan kecil, misalnya teks label, lalu jelaskan tes yang relevan.
- Pemilik juga menjelaskan perbedaan TDD dengan tes setelah implementasi. Bila latihan menambah perilaku, lakukan satu siklus test-first; perubahan kosmetik saja tidak perlu dibuatkan tes semu.
- Selesai jika: jawaban datang dari pemahaman kode aktual; catat bagian yang masih perlu dipelajari. Durasi belajar ini tidak boleh dihapus demi fitur tambahan.

### T30 Finalisasi status demo

- Dependensi: T27–T29; catat hasil T25 meskipun WAITING.
- Batas file: handoff IPD dan ledger.
- Langkah: nyatakan apa yang selesai, sebagian, belum diverifikasi, dan langkah berikutnya. Jika ingin publikasi, catat sebagai pekerjaan terpisah; jangan deploy dari task ini.
- Selesai jika: status akhir sesuai bukti. Demo hanya disebut terverifikasi penuh ketika pemeriksaan API, tes/build, dan review manual terkait sudah dilakukan.

## Cakupan requirement dan kepemilikan pemeriksaan

| Requirement | Task implementasi utama | Bukti utama |
| --- | --- | --- |
| R01 Daftar | T04/T06/T07 | Siklus T04/T06/T07; audit T05/T08/T23 |
| R02 Pencarian/filter | T09/T10 | Siklus T09/T10; audit T11 |
| R03 Validasi | T12/T13 | T13/T22 |
| R04 Simpan | T14/T16/T17 | Siklus T14/T16/T17; audit/integrasi T15/T18/T19 |
| R05 Pemulihan | T04/T06/T14/T17 | Siklus task implementasi; audit T05/T15/T18/T23 |
| R06 Konsistensi | T10/T16 | T18 |
| R07 Keterbukaan sesi | T03/T07 | T19/T25/T26 |
| R08 Kegunaan | T20/T21 | T21/T22/T25 |

## Ledger eksekusi

Status: TODO, DOING, DONE, BLOCKED (hambatan terbukti), WAITING (input/izin belum tersedia), DEFERRED (ditunda secara eksplisit oleh pemilik). DONE memerlukan bukti sesuai kriteria task; task perilaku juga memerlukan tautan siklus di [log TDD](08-TDD-WORKFLOW.md). Simpan ringkasan Red, Green, dan refactor aktual di log tersebut; jangan mengubah tabel TODO menjadi bukti seolah tes sudah dijalankan. Hambatan tidak otomatis berarti requirement dihapus.

| Task | Status | File berubah | Bukti atau hambatan |
| --- | --- | --- | --- |
| T01 | DONE | package.json/lockfile, index.html, src/main.jsx, src/App.jsx, vite.config.js | Build awal lulus; dokumentasi dipertahankan; laporan M0 |
| T02 | DONE | vite.config.js, src/tests/setup.js, paket tes | Probe runner gagal/lulus aktual, lalu dihapus; laporan M0 |
| T03 | DONE | src/pages/InventoryPage.jsx/test.jsx, fixture, src/App.jsx | T03-C01 Red/Green; 1 tes lulus; build akhir lulus |
| T04 | DONE | API/page/table and tests | M1 evidence and 11-REMAINING-MILESTONES.md |
| T05 | DONE | API/page/table and tests | M1 evidence and 11-REMAINING-MILESTONES.md |
| T06 | DONE | API/page/table and tests | M1 evidence and 11-REMAINING-MILESTONES.md |
| T07 | DONE | API/page/table and tests | M1 evidence and 11-REMAINING-MILESTONES.md |
| T08 | DONE | API/page/table and tests | M1 evidence and 11-REMAINING-MILESTONES.md |
| T09 | DONE | Filters/editor/validation and tests | M2 evidence in report 11 |
| T10 | DONE | Filters/editor/validation and tests | M2 evidence in report 11 |
| T11 | DONE | Filters/editor/validation and tests | M2 evidence in report 11 |
| T12 | DONE | Filters/editor/validation and tests | M2 evidence in report 11 |
| T13 | DONE | Filters/editor/validation and tests | M2 evidence in report 11 |
| T14 | DONE | API/save integration and tests | M3 evidence in report 11 |
| T15 | DONE | API/save integration and tests | M3 evidence in report 11 |
| T16 | DONE | API/save integration and tests | M3 evidence in report 11 |
| T17 | DONE | API/save integration and tests | M3 evidence in report 11 |
| T18 | DONE | API/save integration and tests | M3 evidence in report 11 |
| T19 | DONE | API/save integration and tests | M3 evidence in report 11 |
| T20 | DONE | Responsive UI, focus, regression tests | M4 evidence; browser verification separate in T25 |
| T21 | DONE | Responsive UI, focus, regression tests | M4 evidence; browser verification separate in T25 |
| T22 | DONE | Responsive UI, focus, regression tests | M4 evidence; browser verification separate in T25 |
| T23 | DONE | Responsive UI, focus, regression tests | M4 evidence; browser verification separate in T25 |
| T24 | DONE | Responsive UI, focus, regression tests | M4 evidence; browser verification separate in T25 |
| T25 | DONE | Browser checks, screenshots, CSS focus fix | 13-BROWSER-CHECK.md; Chromium desktop/mobile emulation; 63 tests/build pass |
| T26 | DONE | Review, guide and final handoff | Reports 11–14; remaining checks explicitly pending |
| T27 | DONE | Review, guide and final handoff | Reports 11–14; remaining checks explicitly pending |
| T28 | DONE | Review, guide and final handoff | Reports 11–14; remaining checks explicitly pending |
| T29 | DEFERRED | 12-DEMO-AND-LEARNING-GUIDE.md | Owner requested teaching in a separate session; mastery not verified |
| T30 | DONE | Review, guide and final handoff | Reports 11–14; remaining checks explicitly pending |

## Aturan saat anggaran habis

Catat waktu aktual per milestone untuk menguji estimasi lima jam, termasuk belajar dan menjalankan siklus TDD. Penambahan proses ini tidak membuktikan anggaran awal tetap cukup. Jika melampaui anggaran, hentikan penambahan fitur dan identifikasi sisa requirement. Sesuai IPD, pengurangan filter stok rendah adalah usulan pertama, dengan R02/R06 ditandai sebagian dan dokumen sumber diperbarui setelah keputusan scope. Tidak ada pengurangan scope yang dianggap sudah disetujui hanya karena waktu berlalu. Jangan mengganti TDD dengan tes di akhir untuk mengejar waktu.

Jika masih ada hambatan jaringan, simpan bukti mock dan keterbatasannya. Pertahankan waktu memahami kode serta latihan. Pada akhir sesi, tulis task terakhir, task berikutnya, file yang berubah, perintah cek, hasil, dan hambatan di IPD.
