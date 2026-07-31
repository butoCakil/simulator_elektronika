# SIMBION — # Simulasi Lab Interaktif Elektronika

Simulator skema elektronika untuk pembelajaran: rangkaian DC, transien RC/RL,
dioda dan penyearah, transistor, op-amp, potensiometer, transformator, lengkap
dengan osiloskop bergaya CRO. Satu berkas HTML, tanpa pustaka luar, **bekerja
tanpa internet**.

Alamat rencana: **https://bion.simbiot.id**

---

## Isi paket

```
index.html               aplikasinya (satu berkas, ~150 KB)
manifest.webmanifest     keterangan aplikasi agar bisa dipasang
sw.js                    service worker: menyimpan aplikasi untuk luring
CNAME                    subdomain untuk GitHub Pages
ikon/                    ikon aplikasi (192, 512, maskable, iOS, favicon)
```

---

## Menerbitkan lewat GitHub Pages

1. Buat repositori baru, misalnya `simbion`.
2. Salin **seluruh isi folder ini ke akar repositori** (bukan ke dalam
   subfolder), lalu unggah.
3. Di repositori: **Settings → Pages**. Bagian *Source* pilih
   `Deploy from a branch`, cabang `main`, folder `/ (root)`. Simpan.
4. Masih di halaman itu, isi *Custom domain* dengan `bion.simbiot.id`
   dan centang **Enforce HTTPS** setelah sertifikatnya terbit
   (biasanya beberapa menit sampai satu jam).
5. Di pengelola DNS `simbiot.id`, tambahkan satu rekaman:

   | Tipe | Nama | Nilai |
   |---|---|---|
   | CNAME | `bion` | `NAMA-AKUN-GITHUB.github.io` |

   Ganti `NAMA-AKUN-GITHUB` dengan nama akun Anda. Berkas `CNAME` di paket ini
   sudah berisi `bion.simbiot.id`, jadi langkah 4 dan 5 saling melengkapi.

HTTPS itu **wajib**, bukan pilihan: service worker tidak berjalan tanpa HTTPS,
dan tanpa service worker aplikasi tidak bisa dipasang maupun dipakai luring.

---

## Cara memakai di kelas

### Guru — PC untuk proyektor (Windows, luring)

1. Buka `https://bion.simbiot.id` dengan Chrome atau Edge.
2. Klik ikon **pasang** di ujung kanan bilah alamat, atau menu **⋯ → Pasang
   aplikasi** di dalam aplikasinya.
3. Setelah terpasang, ada ikonnya di menu Start dan berjalan tanpa bilah
   peramban — **tidak perlu internet lagi**.
4. Untuk mengajar, nyalakan **⋯ → Mode proyektor**: seluruh huruf dan ketebalan
   garis naik 1,5× agar terbaca dari baris belakang.

### Siswa — Android (luring)

1. Buka alamat itu dengan Chrome.
2. Menu Chrome (⋮) → **Tambahkan ke layar Utama** / **Instal aplikasi**.
3. Sesudah itu bisa dibuka tanpa internet.

### Siswa — iPhone / iPad

Safari tidak menawarkan pemasangan otomatis. Buka alamatnya di **Safari**, tekan
tombol **Bagikan**, pilih **Tambahkan ke Layar Utama**. Menu **⋯** di dalam
aplikasi juga menampilkan petunjuk ini.

### Tanpa memasang apa pun

`index.html` bisa diunduh dan dibuka langsung dari folder — semua simulasinya
berfungsi penuh. Yang tidak berfungsi hanya pemasangan sebagai aplikasi, karena
service worker memang tidak berjalan dari `file://`. Ini cadangan yang baik
untuk lab tanpa internet sama sekali: bagikan berkasnya lewat flashdisk.

**Satu hal yang perlu diberitahukan ke siswa:** kunjungan pertama butuh internet
sekali. Sesudah itu aplikasinya tersimpan di perangkat dan luring seterusnya.

---

## Menerbitkan pembaruan

Setiap kali `index.html` diubah:

1. **Naikkan nomor versi di `sw.js`** — baris `const VERSI = 'simbion-v1';`
   menjadi `'simbion-v2'`, dan seterusnya.
2. Unggah ulang.

Tanpa langkah 1, peramban tidak tahu ada pembaruan dan pengguna akan tetap
memakai versi lama dari simpanannya. Kalau nomornya dinaikkan, aplikasi yang
sudah terpasang akan menampilkan pita **"Versi baru SIMBION tersedia"** dengan
tombol muat ulang.

---

## Berkas rangkaian

Rangkaian disimpan sebagai JSON. Nama berkas mengikuti **Nama rangkaian** yang
bisa diubah di panel bawah saat tidak ada komponen terpilih.

Berkas memuat penanda `aplikasi` dan `versi`. Gunanya bukan sekadar catatan:

- berkas yang dibuat **sebelum** penomoran ini tetap bisa dibuka — sifat yang
  waktu itu belum ada (nama alat ukur, cermin komponen) dilengkapi otomatis;
- berkas yang dibuat oleh **versi lebih baru** ditolak dengan pesan yang jelas,
  bukan dibuka setengah-setengah lalu rusak.

Kalau kelak bentuk datanya berubah, naikkan `VERSI_BERKAS` di `index.html` dan
tambahkan satu cabang di fungsi `migrasi()`.

---

## Menyetel kehalusan kenop osiloskop

Di `index.html`, dua tetapan berdekatan:

- `LANGKAH_HALUS` (0,01 divisi) — langkah tombol ◀ ▶ dan ▼ ▲.
- `GESER_MAKS` (40 divisi) — jangkauan peluncur geser waktu. Ini yang
  menentukan kehalusan **peluncur**: jangkauan dibagi lebarnya dalam piksel.
  Makin kecil, makin halus, tetapi makin pendek jangkauan ke belakang.

---

## Yang belum diputuskan

**Lisensi.** Paket ini belum memuat berkas lisensi, dan itu keputusan yang harus
diambil pemiliknya, bukan ditebak. Selama belum ada berkas lisensi, secara
bawaan hak ciptanya tertutup — orang lain tidak berhak menyebarkan ulang atau
memodifikasi. Kalau tujuannya agar guru lain bisa memakai dan mengubah,
tambahkan berkas `LICENSE` berisi lisensi pilihan Anda (MIT untuk sebebas
mungkin, GPLv3 agar turunannya tetap terbuka, CC BY-NC-SA untuk pendidikan
non-komersial).

**Toko aplikasi.** Microsoft Store menerima PWA dan pendaftaran developer
individu kini tanpa biaya. Google Play memerlukan pembungkus (TWA atau
Capacitor), biaya $25 sekali, dan untuk akun pribadi baru ada syarat uji
tertutup 12 penguji selama 14 hari — akun organisasi dibebaskan dari syarat itu.
