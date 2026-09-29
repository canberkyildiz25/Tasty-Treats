import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Onest, Space_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import RevealInit from '@/components/RevealInit'
import GsapFx from '@/components/GsapFx'
import { StoreHydrator } from '@/lib/store'

/* next/font fontları derleme sırasında indirip siteyle birlikte sunuyor
   (woff2, alt küme). Önceki sürüm 11 ayrı TTF dosyası yüklüyordu — yaklaşık
   1 MB; bunlar birkaç yüz KB. */
const display = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz'],
  variable: '--nf-display',
})

const body = Onest({
  subsets: ['latin', 'latin-ext'],
  variable: '--nf-body',
})

const mono = Space_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--nf-mono',
})

export const metadata: Metadata = {
  // Paylaşım görselinin tam adresi bundan türetiliyor; yoksa localhost yazılıyordu.
  metadataBase: new URL('https://mise-prep.vercel.app'),
  title: {
    default: 'MISE — Recipes with the timing worked out',
    template: '%s — MISE',
  },
  description:
    'Fourteen recipes written backwards from dinner: tell MISE when you want to eat and every step gets a clock time, with the minutes that need you kept apart from the ones that don’t.',
  openGraph: {
    title: 'MISE — Good food. Better timing.',
    description: 'Recipes with the timing worked out.',
    images: ['/film/butter-poster.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#14120F',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Kaydırınca belirme yalnızca JS varsa ve hareket azaltılmamışsa
            gizliyor: yoksa içerik olduğu gibi görünür. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <StoreHydrator />
        <ScrollProgress />
        <Nav />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <RevealInit />
        <GsapFx />
      </body>
    </html>
  )
}
