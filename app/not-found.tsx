import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="frame page-top pb-24">
      <p className="eyebrow">Ticket not on the rail</p>
      <h1 className="title-xl mt-5">Nothing here.</h1>
      <p className="lede mt-6">
        Whatever this address pointed at, it is not on the pass. The list is the safest place to start again.
      </p>
      <div className="flex flex-wrap gap-4 mt-10">
        <Link href="/recipes" className="btn">All recipes <span className="arrow" aria-hidden>↗</span></Link>
        <Link href="/" className="btn btn-ghost">Home</Link>
      </div>
    </div>
  )
}
