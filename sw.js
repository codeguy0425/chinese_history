const CACHE = 'zhongshi-v1';
const URLS = [
  'index.html',
  'Sample Exam Paper.html',
  'Revision Long Questions.html',
  'workbook.html',
  'Print Version.html',
  'Timeline Slides - CSS.html',
  'Timeline Slides - Mermaid Max.html',
  'Timeline Slides - TimelineJS.html',
  'Timeline Slides.html',
  '2526期終考試溫習範圍.pdf',
  'study.md',
  'icon.svg',
  'manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
