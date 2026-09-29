'use client'
/* Adres satırındaki sorgu dizesi (?course=…, ?at=…) React'e dışarıdan
   bir kaynak olarak bağlanıyor. Effect içinde okuyup state'e kopyalamak
   her yüklemede fazladan bir çizim ve kısa bir titreme demekti;
   useSyncExternalStore sunucuda boş, tarayıcıda gerçek değeri veriyor ve
   hidrasyonu kendisi eşitliyor.

   Yazarken window.history.replaceState kullanılıyor (Next 16 bunu kendi
   yönlendiricisiyle eşitliyor); replaceState olay yaymadığı için kendi
   olayımızı yayıyoruz ki abone bileşenler yeniden çizilsin. */
import { useSyncExternalStore } from 'react'

const EVENT = 'mise:search'

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(EVENT, onChange)
  }
}

export function useLocationSearch(): string {
  return useSyncExternalStore(subscribe, () => window.location.search, () => '')
}

export function replaceSearch(params: URLSearchParams) {
  const qs = params.toString()
  window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  window.dispatchEvent(new Event(EVENT))
}

const never = () => () => {}

/* Sunucuda sabit, tarayıcıda hesaplanan bir değer — "şimdiden birkaç saat
   sonrası" gibi saate bağlı varsayılanlar için. Sunucu ve tarayıcı farklı
   saat çizse hidrasyon uyuşmazlığı olurdu. */
export function useClientValue<T>(client: () => T, server: T): T {
  return useSyncExternalStore(never, client, () => server)
}
