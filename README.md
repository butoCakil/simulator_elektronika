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