import { Link } from 'react-router-dom'
import {
  findRecipe,
  totalMinutes,
  activeMinutes,
  formatDuration,
  KITCHENS,
} from '../data/recipes'
import { photoFor } from '../data/photos'
import { useKitchen } from '../store/kitchen'

export default function Saved() {
  const saved = useKitchen((s) => s.saved)
  const toggleSaved = useKitchen((s) => s.toggleSaved)

  // Kaydedilenler tarayıcıda duruyor; tarif silinmiş olabilir diye ayıklıyoruz
  const list = saved.map(findRecipe).filter(Boolean)
  const handsTotal = list.reduce((sum, r) => sum + activeMinutes(r), 0)

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 md:py-16">
      <header className="mb-10 max-w-xl">
        <p className="docket text-copper-500 mb-3">THE PASS</p>
        <h1 className="font-display text-5xl md:text-6xl text-char-950 mb-4">Saved</h1>
        <p className="text-char-800/75 leading-relaxed">
          Kept in this browser, not in an account. Clear your site data and this list
          goes with it.
        </p>
      </header>

      <div className="perforation mb-8" />

      {list.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-2xl text-char-950 mb-3">Nothing on the rail</p>
          <p className="text-char-800/65 max-w-sm mx-auto mb-8">
            Anything you save from a recipe page turns up here.
          </p>
          <Link to="/recipes" className="btn-service">
            Browse the fourteen
          </Link>
        </div>
      ) : (
        <>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-9">
            <div>
              <dt className="docket mb-1">ON THE LIST</dt>
              <dd className="font-mono text-xl text-char-900">{list.length}</dd>
            </div>
            <div>
              <dt className="docket mb-1">HANDS ON, ALL OF IT</dt>
              <dd className="font-mono text-xl text-copper-500">
                {formatDuration(handsTotal)}
              </dd>
            </div>
          </dl>

          <ul className="space-y-3">
            {list.map((recipe) => {
              const kitchen = KITCHENS.find((k) => k.id === recipe.kitchen)
              const photo = photoFor(recipe.slug)

              return (
                <li key={recipe.slug} className="ticket p-5">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    <Link
                      to={`/recipes/${recipe.slug}`}
                      className="flex items-center gap-4 flex-1 min-w-[14rem] group"
                    >
                      {photo && (
                        <img
                          src={photo.src}
                          alt=""
                          loading="lazy"
                          className="w-20 h-20 object-cover shrink-0"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="docket">{recipe.ticket}</span>
                          <span className="stamp text-steel-500">{kitchen?.label}</span>
                        </div>
                        <h2 className="font-display text-xl text-char-950 leading-tight transition-colors group-hover:text-copper-500">
                          {recipe.title}
                        </h2>
                      </div>
                    </Link>

                    <dl className="flex gap-6">
                      <div>
                        <dt className="docket mb-0.5">Total</dt>
                        <dd className="font-mono text-sm text-char-900">
                          {formatDuration(totalMinutes(recipe))}
                        </dd>
                      </div>
                      <div>
                        <dt className="docket mb-0.5">Hands on</dt>
                        <dd className="font-mono text-sm text-copper-500">
                          {formatDuration(activeMinutes(recipe))}
                        </dd>
                      </div>
                    </dl>

                    <button
                      onClick={() => toggleSaved(recipe.slug)}
                      className="docket hover:text-flame-500 transition-colors"
                      aria-label={`Remove ${recipe.title} from saved`}
                    >
                      REMOVE
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
