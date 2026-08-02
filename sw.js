/* ============================================================================
   SIMBION — service worker
   Strategi: seluruh berkas aplikasi disimpan saat pemasangan (precache), lalu
   permintaan dilayani dari simpanan lebih dulu. Karena aplikasinya satu
   berkas HTML plus beberapa ikon, cara ini sederhana dan tahan gagal.
   NAIKKAN nomor VERSI setiap kali index.html diubah, agar peramban tahu ada
   pembaruan dan simpanan lama dibersihkan.
   ========================================================================== */
const VERSI = 'simbion-v2.6';
const BERKAS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './ikon/ikon-192.png',
  './ikon/ikon-512.png',
  './ikon/ikon-512-maskable.png',
  './ikon/apple-touch-icon-180.png',
  './ikon/favicon-64.png'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSI);
    /* satu berkas gagal tidak boleh menggagalkan seluruh pemasangan */
    await Promise.all(BERKAS.map(u =>
      c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const nama = await caches.keys();
    await Promise.all(nama.filter(n => n !== VERSI).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

/* Halaman meminta pembaruan segera setelah pengguna menekan "Muat ulang" */
self.addEventListener('message', e => {
  if (!e.data) return;
  if (e.data.aksi === 'lewatiTunggu') self.skipWaiting();
  /* Halaman menanyakan nomor versi worker BARU, untuk ditulis di pemberitahuan */
  if (e.data.aksi === 'versi' && e.ports && e.ports[0]) e.ports[0].postMessage(VERSI);
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const url = new URL(r.url);
  if (url.origin !== location.origin) return;      /* biarkan permintaan luar */

  e.respondWith((async () => {
    const c = await caches.open(VERSI);
    const simpan = await c.match(r, { ignoreSearch: true });
    if (simpan) {
      /* segarkan diam-diam di belakang, supaya versi berikutnya sudah siap */
      fetch(r).then(res => { if (res && res.ok) c.put(r, res.clone()) }).catch(() => {});
      return simpan;
    }
    try {
      const res = await fetch(r);
      if (res && res.ok && res.type === 'basic') c.put(r, res.clone());
      return res;
    } catch (_) {
      /* tanpa jaringan: untuk permintaan halaman, kembalikan aplikasinya */
      if (r.mode === 'navigate') {
        const utama = await c.match('./index.html');
        if (utama) return utama;
      }
      return new Response('Tidak tersedia luring.', {
        status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  })());
});