import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-28 text-center">
      <p className="docket text-copper-500 mb-4">TICKET NOT ON THE RAIL</p>
      <h1 className="font-display text-5xl md:text-6xl text-char-950 mb-5">
        Nothing here
      </h1>
      <p className="text-char-800/75 max-w-md mx-auto mb-9 leading-relaxed">
        Whatever this address pointed at, it is not on the pass. The list is the
        safest place to start again.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/recipes" className="btn-service">All recipes</Link>
        <Link to="/" className="btn-outline">Home</Link>
      </div>
    </div>
  )
}
