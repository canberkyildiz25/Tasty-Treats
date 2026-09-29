import Link from 'next/link'

/* Alt bilgi: kısa bir cümle, sayfa genişliğinde "MISE" damgası (kaydırınca
   aşağıdan yükseliyor — GsapFx), bağlantılar ve künyeler. */
export default function Footer() {
  return (
    <footer className="foot">
      <div className="frame">
        <div className="foot-top">
          <p>Less rush. More around the table.</p>
          <Link href="/recipes" className="btn btn-light magnetic">
            Make something good <span className="arrow" aria-hidden>↗</span>
          </Link>
        </div>
        <div className="foot-mark" aria-hidden>MISE</div>
        <div className="foot-bottom">
          <span>A kitchen companion by Canberk Yildiz.</span>
          <nav aria-label="Footer">
            <Link href="/recipes">Recipes</Link>
            <Link href="/method">The MISE way</Link>
            <Link href="/saved">Saved</Link>
          </nav>
        </div>
        <p className="foot-credit">
          Recipe photographs from Wikimedia Commons under CC BY / CC BY-SA, credited on each
          recipe. Opening film by Gilario Guevara on{' '}
          <a href="https://www.pexels.com/video/10835189/" target="_blank" rel="noreferrer">Pexels</a>.
          Saved recipes stay in this browser.
        </p>
      </div>
    </footer>
  )
}
