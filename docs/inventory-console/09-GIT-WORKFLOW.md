# Git workflow Inventory Operations Console

Status: kebijakan proyek hasil sintesis dari [panduan PR DeployHQ](https://www.deployhq.com/blog/the-perfect-pull-request-best-practices-for-collaborative-development), diakses 9 November 2026. Ini konvensi proyek, bukan satu standar wajib seluruh industri.

## Fakta awal dan repository

GitHub CLI mengonfirmasi repo https://github.com/DevvMa/inventory-operation kosong sebelum setup. Tanda titik pada akhir URL pengguna diperlakukan sebagai tanda baca setelah repo tanpa titik dikonfirmasi. Workspace lokal semula hanya berisi dokumentasi dan belum memiliki .git.

Dokumentasi awal diamankan dalam root commit pada main. Ini bootstrap repo kosong agar PR memiliki base; perubahan selanjutnya menggunakan branch dan PR, bukan push fitur langsung ke main. File PDF eksternal tidak disalin ke repo.

## Branch dan commit

- Branch berumur pendek: <type>/<milestone>-<description-kebab-case>.
- Contoh: chore/m0-react-tdd-foundation, feat/m1-product-loading, fix/m3-stock-retry.
- Commit mengikuti Conventional Commits: <type>(<scope>): <imperative description>.
- Tipe: feat, fix, test, refactor, docs, chore, ci. Scope menjelaskan bagian seperti tooling, inventory, api, tdd, atau workflow.
- Commit logis dan dapat ditinjau; jangan memasukkan dependency/node_modules, cache, dist, atau secret.
- Siklus Red dicatat dalam log TDD; tidak wajib membuat atau push commit yang sengaja memiliki tes gagal. Commit yang diajukan untuk review harus green.
- Perubahan dokumentasi baseline, tooling, perilaku, dan bukti progres dibedakan dalam commit terarah. Lockfile disertakan untuk instalasi reproducible.

## Alur pull request

1. Sinkronkan main setelah memastikan working tree bersih; buat branch untuk satu hasil reviewable.
2. Ikuti task berurutan dan proses Red → Green → refactor pada perilaku baru.
3. Jalankan tes terkait, suite penuh pada gerbang, build, dan git diff --check. Catat cek manual yang belum diizinkan secara eksplisit.
4. Self-review diff untuk ketepatan scope, error path, tidak ada secret, dan dokumentasi aman.
5. Push branch dan buat PR ke main memakai template .github. Judul mengikuti Conventional Commits agar cocok menjadi squash commit.
6. Deskripsi menjelaskan masalah/hasil, task yang tercakup, urutan review, hasil verifikasi, keterbatasan, dan deployment/rollback. Lampirkan screenshot hanya jika benar-benar diambil dengan izin; jangan mencentang pengujian yang belum dilakukan.
7. Usahakan diff source kecil dan satu tujuan. PR M0 memuat lockfile generated yang dapat besar; arahkan reviewer ke source/config lebih dahulu. Rencana awal sudah menjadi baseline terpisah.
8. Perbaiki temuan blocking dan jalankan kembali cek terdampak. Temuan nonblocking diberi label nit/suggestion; pertanyaan diberi question.

## Merge

Keputusan proyek: squash merge ke main setelah CI test-and-build lulus, branch mutakhir, temuan blocking selesai, dan reviewer independen menyetujui. Jika hanya ada satu maintainer, ketiadaan reviewer tidak boleh ditulis sebagai approval; catat pengecualian secara eksplisit oleh pemilik sebelum merge.

Setelah merge terkonfirmasi, sinkronkan main dan hapus branch fitur yang sudah selesai. Jangan force-push main. Jika fitur berikutnya bergantung pada PR belum merged, tunggu review atau gunakan stacked PR dengan base/dependensi yang dinyatakan jelas; jangan menyelundupkan milestone berikutnya ke PR sebelumnya.

Merge atau publikasi tidak dijalankan otomatis oleh pekerjaan M0. Revert squash commit melalui PR baru bila perlu rollback; tidak ada deployment/migrasi database dalam scope demo ini.

## Otomasi dan batas penerapan

File PR template dan GitHub Actions disediakan di branch. Workflow menjalankan npm ci, tes sekali jalan, dan build pada PR/main. Node lokal serta CI memakai major 22; paket tepat terkunci di package-lock.json.

Rekomendasi protection main: wajib PR, satu approval independen, dismiss stale review, cek test-and-build wajib, branch mutakhir, dan larangan force-push. Dokumentasi kebijakan bukan bukti setting GitHub sudah aktif. Status penerapan remote dan hasil CI dicatat pada laporan M0; jangan mengklaim ruleset/protection sudah terpasang jika belum diperiksa/dikonfigurasi.

Hasil penerapan 9 November 2026: endpoint protection berhasil menerima konfigurasi dan mengonfirmasi strict check test-and-build serta satu approval. Repo settings mengonfirmasi hanya squash merge diperbolehkan dan penghapusan branch setelah merge aktif. PR #1 masih OPEN/REVIEW_REQUIRED; bukti CI dan URL ada pada [laporan M0](10-M0-VERIFICATION.md).

M0 merupakan pengecualian bootstrap runner, bukan alasan menunda tes fitur ke akhir. Baca [Alur TDD](08-TDD-WORKFLOW.md) dan [task list](07-MILESTONES-AND-TASKS.md).
