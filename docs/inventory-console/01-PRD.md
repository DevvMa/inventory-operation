# PRD Inventory Operations Console

Status: baseline rancangan 0.1. Semua kebutuhan di bawah merupakan keputusan demo hasil sintesis, bukan hasil riset pengguna operasional perusahaan.

## Tujuan dan pengguna

Pengguna demo adalah admin inventori yang perlu menemukan produk dan mengoreksi stok. Prototipe menunjukkan kemampuan React pada satu alur lengkap serta menyediakan bahan penjelasan keputusan teknis saat interview.

Ukuran keberhasilan: requirement di bawah terverifikasi dan pemilik mampu menjelaskan implementasinya. Tidak ada klaim dampak bisnis, penggunaan production, atau peningkatan performa sebelum diukur.

## Scope dan kriteria penerimaan

| ID | Kebutuhan | Kriteria penerimaan |
| --- | --- | --- |
| R01 | Muat data API | Ambil maksimal 50 produk; tampilkan jumlah yang benar-benar dimuat. Tabel berisi nama, kategori, harga, stok, dan aksi edit. |
| R02 | Cari dan filter | Pencarian nama mengabaikan kapital dan spasi di awal/akhir. Filter stok rendah dapat digabung dengan pencarian. Hasil dihitung hanya dari produk yang dimuat. |
| R03 | Edit stok | Satu editor aktif. Nilai awal mengikuti stok produk. Hanya bilangan bulat aman JavaScript, minimal 0, diterima; input kosong ditolak. Nilai stok sama boleh dikirim. |
| R04 | Simpan | PATCH stok; tabel berubah setelah respons sukses dan lolos pemeriksaan data. Selama menyimpan, cegah submit ganda dan perpindahan editor. |
| R05 | Pemulihan | Loading, data kosong, hasil filter kosong, gagal muat, sedang simpan, gagal simpan, dan sukses dapat dibedakan. Retry muat tersedia; gagal simpan mempertahankan input dan stok tabel lama. |
| R06 | Konsistensi | Setelah simpan, pencarian/filter langsung memakai stok terbaru. Filter stok rendah dapat menghilangkan baris yang stoknya sudah mencukupi. |
| R07 | Keterbukaan demo | Tampilkan bahwa perubahan hanya berlaku selama sesi; reload mengambil ulang data server. Harga ditampilkan sebagai nilai numerik API tanpa mengarang mata uang. |
| R08 | Kegunaan dasar | Kontrol memiliki label, fokus terlihat, status dapat dibaca teknologi bantu. Form dan filter dapat dipakai dengan keyboard; layar kecil tetap dapat mengakses tabel. |

Aturan bisnis B01: stok rendah berarti stok < 10, termasuk stok 0. Ambang ini ditetapkan untuk demo, bukan berasal dari kebijakan perusahaan atau API.

## Di luar baseline

Login/otorisasi, database atau backend sendiri, tambah/hapus produk, audit trail, multi-user, penyesuaian stok bersamaan, pagination, grafik, export, penyimpanan lokal, dan deployment publik. Penambahan fitur memerlukan keputusan scope baru setelah alur inti serta verifikasi selesai.

Referensi: kontrak teknis [TRD](02-TRD.md), alur [AFD](03-AFD.md), bukti selesai [IPD](06-IPD.md).
