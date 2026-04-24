const CACHE="masarifi-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./index.html","./manifest.json"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(cached=>{if(cached)return cached;return fetch(e.request).then(res=>{if(e.request.method==="GET"&&res.status===200){const clone=res.clone();caches.open(CACHE).then(c=>c.put(e.request,clone))}return res}).catch(()=>caches.match("./index.html"))}))});
