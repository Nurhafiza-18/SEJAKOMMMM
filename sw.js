// NAMA FAIL: sw.js

// Nama cache unik. Tukar nombor versi (v1, v2, etc.) jika anda mengemas kini aset.
const CACHE_NAME = 'sejakom-cache-v1';

// Senarai semua fail dan aset yang perlu disimpan untuk mod offline.
const urlsToCache = [
  // Halaman utama
  './', 
  'index.html',
  
  // Aset bunyi
  'https://www.soundjay.com/buttons/sounds/button-3.mp3',
  'https://www.soundjay.com/misc/sounds/magic-chime-01.mp3',

  // Aset imej (dari ibb.co)
  'https://i.ibb.co/605s0SSz/1.png',
  'https://i.ibb.co/wNs1Nq06/33.png',
  'https://i.ibb.co/rKR694wk/2.png',
  'https://i.ibb.co/8Jsx97v/bkr.png',
  'https://i.ibb.co/27wTy2QC/4.png',
  'https://i.ibb.co/gF9ZbfkV/6.png',
  'https://i.ibb.co/JRQ67dkK/5.png',
  'https://i.ibb.co/3mKBJKVc/khattb.png',
  'https://i.ibb.co/7dxhbtZw/8.png',
  'https://i.ibb.co/9mVMNQ9W/9.png',
  'https://i.ibb.co/ksLz5y4q/10.png',
  'https://i.ibb.co/3y0vKY51/12.png',
  'https://i.ibb.co/LzvM7N95/13.png',
  'https://i.ibb.co/pvqQHvnX/14.png',
  'https://i.ibb.co/Sw95vFJy/harun.png',
  'https://i.ibb.co/q3GJ18Rf/16.png',
  'https://i.ibb.co/KpdpMDrP/17.png',
  'https://i.ibb.co/XxCm8tQf/18.png',
  'https://i.ibb.co/DHtR6zxK/akhbar.png',
  'https://i.ibb.co/4wCF5gw2/20.png',
  'https://i.ibb.co/n8jWdzJN/21.png',
  'https://i.ibb.co/CsVLZ9Jp/22.png',
  'https://i.ibb.co/8h1RY9Y/aurangzeb.png',
  'https://i.ibb.co/Kc9bvXXW/24.png',
  'https://i.ibb.co/gMhfNTdf/25.png',
  'https://i.ibb.co/Hfj7cx6Z/salahuddin.png',
  'https://i.ibb.co/MDNW97Tf/27.png',
  'https://i.ibb.co/3mtTbGwM/28.png',
  'https://i.ibb.co/pB9JTJt3/29.png',
  'https://i.ibb.co/N6XVmfd4/30.png',
  'https://i.ibb.co/23dKPNzY/31.png',
  'https://i.ibb.co/GfdCwCxC/32.png',

  // Ikon aplikasi (anda perlu cipta folder 'icons' dan letak ikon di dalamnya)
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
];

// Pasang Service Worker dan simpan aset ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka. Menyimpan aset untuk mod luar talian.');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Gagal menyimpan cache:', err);
      })
  );
});

// Pintas permintaan rangkaian (fetch requests)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada dalam cache, pulangkan dari cache. Jika tidak, dapatkan dari rangkaian.
        return response || fetch(event.request);
      })
  );
});

// Kemas kini Service Worker dan padam cache lama
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});