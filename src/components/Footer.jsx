import { Link } from 'react-router-dom'
import { COURSES } from '../data/recipes'

export default function Footer() {
  return (
    <footer className="border-t border-ticket-200 mt-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto_auto]">
          <div className="max-w-xs">
            <span className="font-display text-2xl text-char-950 block leading-none mb-2">
              MISE
            </span>
            <p className="text-sm text-char-800/70 leading-relaxed mb-4">
              Fourteen recipes, each with the timing worked out. Nothing to sign up
              for — what you save stays in this browser.
            </p>
            <p className="text-xs text-char-800/55 leading-relaxed">
              Photographs from Wikimedia Commons under CC BY and CC BY-SA licences,
              each credited on its recipe.
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <p className="docket mb-1">COURSES</p>
            {COURSES.map((course) => (
              <Link
                key={course.id}
                to={`/recipes?course=${course.id}`}
                className="text-sm text-char-800/80 hover:text-copper-500 transition-colors"
              >
                {course.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2">
            <p className="docket mb-1">THE SITE</p>
            <Link to="/recipes" className="text-sm text-char-800/80 hover:text-copper-500 transition-colors">
              All recipes
            </Link>
            <Link to="/method" className="text-sm text-char-800/80 hover:text-copper-500 transition-colors">
              How it works
            </Link>
            <Link to="/saved" className="text-sm text-char-800/80 hover:text-copper-500 transition-colors">
              Saved
            </Link>
          </nav>
        </div>

        <div className="perforation my-8" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="docket">MISE · A PORTFOLIO PROJECT BY CANBERK YILDIZ</p>
          <p className="docket">NO. {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
