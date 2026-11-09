# Verifikasi M0 fondasi React dan TDD

Status: hasil aktual T01–T03; verifikasi dilakukan 9 November 2026. Ini laporan fondasi, bukan klaim seluruh aplikasi selesai.

## Hasil aktual

| Pemeriksaan | Hasil |
| --- | --- |
| Node/npm | Node 22.23.1; npm 10.9.8 |
| Paket terpasang | React/React DOM 19.3.1; Vite 8.3.7; plugin React 6.3.0; Vitest 5.1.0; jsdom 31.0.0; RTL 16.3.3; user-event 14.6.8; jest-dom 7.0.1 |
| Instalasi | Berhasil; lockfile dibuat; npm melaporkan 0 vulnerabilities saat instalasi (bukan jaminan keamanan menyeluruh) |
| Build awal T01 | npm run build lulus; 15 modul ditransformasi |
| Runner probe T02 | Assertion 2 menjadi 3 gagal sesuai harapan; diubah menjadi 2 lalu 1 tes lulus; probe sementara dihapus |
| Red fitur T03 | npm run test:run -- src/pages/InventoryPage.test.jsx gagal: pemberitahuan penyimpanan sesi tidak ditemukan pada DOM |
| Green T03 | Setelah menambahkan pemberitahuan, npm run test:run lulus: 1 file, 1 tes |
| Refactor T03 | Belum perlu abstraksi tambahan; komponen halaman tetap kecil dan App mendelegasikan render; suite tetap green |
| Build akhir | npm run build lulus; 16 modul; dist dibuat lokal dan diabaikan Git |
| Whitespace | git diff --check lulus |
| HTTP lokal | Invoke-WebRequest ke http://127.0.0.1:5173/ menghasilkan 200; root dan entry main.jsx ada. Ini pemeriksaan HTTP, bukan review browser |
| Dokumentasi | Root commit dc2ab12 mengamankan sembilan dokumen awal. git diff main untuk 01-PRD sampai 05-BSD kosong; update progres hanya pada dokumen tracking/indeks |

Perintah saat pengembangan: npm run dev; tes watch: npm test; sekali jalan: npm run test:run; build: npm run build. Vite berhasil mulai pada 127.0.0.1:5173 dengan strictPort, tanpa membuka browser.

## Batas bukti

- Tes DOM membuktikan pemberitahuan demo terlihat pada render komponen di jsdom; belum membuktikan layout visual atau navigasi keyboard di browser.
- GET/PATCH DummyJSON belum diimplementasikan, jadi tidak ada klaim integrasi API atau CORS.
- Fixture Kopi A/B dan Teh C hanya berada dalam folder tes; tidak dipasang sebagai fallback production.
- CI, PR, dan setting remote harus dibedakan dari hasil lokal; status remote ditambahkan setelah diverifikasi.
- Task berikutnya T04 pada M1; M0 diajukan sebagai PR terarah sebelum milestone berikutnya.

## Git workflow

Repo terkonfirmasi kosong melalui gh repo view. main dibuat dengan dokumentasi baseline dan berhasil dipush. Pekerjaan M0 berada pada chore/m0-react-tdd-foundation. [Kebijakan workflow](09-GIT-WORKFLOW.md) dan PR template tersedia; tidak ada merge atau deployment otomatis.

Riwayat konfigurasi awal, terverifikasi 9 November 2026 sebelum penyesuaian proyek solo:

- [PR #1](https://github.com/DevvMa/inventory-operation/pull/1) OPEN, reviewDecision REVIEW_REQUIRED.
- CI test-and-build pada commit 4a8c669 SUCCESS, durasi job 9 detik: [run pertama](https://github.com/DevvMa/inventory-operation/actions/runs/42631965791/job/129210261077). Pembaruan catatan ini memicu run baru; periksa status head terbaru sebelum merge.
- API GitHub mengonfirmasi main protected: strict status check test-and-build dan satu approving review; stale reviews dismissed, conversation resolution dan enforce admins diminta pada konfigurasi protection yang berhasil diterapkan.
- Settings repo mengonfirmasi squash merge aktif, merge commit/rebase merge nonaktif, serta hapus branch setelah merge aktif.
- Belum ada review independen, merge, atau deployment. Tidak ada klaim bahwa author self-review memenuhi approval wajib.

## Penyesuaian proyek solo

Pengguna mengonfirmasi proyek dikerjakan sendiri. Endpoint protection diperbarui lalu dibaca ulang: required_approving_review_count=0, dismiss_stale_reviews=false; strict status check test-and-build tetap aktif, conversation resolution tetap aktif, force-push tetap dilarang. Objek required_pull_request_reviews dipertahankan agar jalur PR tetap digunakan tanpa meminta approval eksternal.

Pemeriksaan PR #1 sesudah perubahan: OPEN, mergeStateStatus=CLEAN, reviewDecision kosong; CI pada head 47f09fa SUCCESS. Pembaruan dokumentasi ini akan memicu pemeriksaan CI baru. PR tidak di-merge. Template dan deskripsi PR diselaraskan dengan kebijakan solo; self-review tidak diklaim sebagai review independen.
