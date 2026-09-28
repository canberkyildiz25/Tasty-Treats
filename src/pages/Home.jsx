import { useState } from "react";
import { Link } from "react-router-dom";
import {
  recipes,
  findRecipe,
  COURSES,
  activeMinutes,
  totalMinutes,
  formatDuration,
} from "../data/recipes";
import { buildSchedule } from "../lib/schedule";
import { photoFor } from "../data/photos";
import RecipeCard from "../components/RecipeCard";

const DEMO_SLUG = "roast-chicken-lemon-thyme";

export default function Home() {
  const [serveAt, setServeAt] = useState("20:00");
  const [course, setCourse] = useState("all");
  const demo = findRecipe(DEMO_SLUG);
  const plan = buildSchedule(demo, serveAt);
  const weeknight = [...recipes]
    .sort((a, b) => activeMinutes(a) - activeMinutes(b))
    .slice(0, 3);
  const collection =
    course === "all"
      ? recipes
      : recipes.filter((recipe) => recipe.course === course);
  return (
    <div className="mise-home">
      <section className="kitchen-hero" aria-labelledby="hero-title">
        <div className="hero-scene" aria-hidden="true">
          <img
            src="/img/mise-evening-kitchen.webp"
            alt=""
            width="2048"
            height="1152"
            fetchPriority="high"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">A little preparation. A lot more pleasure.</p>
          <h1 id="hero-title">
            Good food.
            <br />
            Better timing.
          </h1>
          <p className="hero-description">
            Recipes for the way evenings should feel.
            <br />
            You choose dinner. We work out the when.
          </p>
          <Link to="/recipes" className="hero-cta">
            Find your next dinner <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="hero-bottom">
          <div className="hero-definition">
            <span>MISE EN PLACE</span>
            <p>
              Everything in its place.
              <br />
              Including your time.
            </p>
          </div>
          <a className="hero-feature" href="#dinner-plan">
            <span className="feature-number">14</span>
            <span>
              Considered recipes.
              <br />
              Every minute worked out.
            </span>
            <span className="feature-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </section>
      <section
        className="dinner-section page-frame"
        id="dinner-plan"
        aria-labelledby="plan-heading"
      >
        <div className="section-intro">
          <p className="eyebrow">A calmer kind of cooking</p>
          <h2 id="plan-heading">Dinner, on your time.</h2>
          <p>
            Start with when you want to eat.
            <br />
            Let the rest fall into place.
          </p>
        </div>
        <div className="dinner-workbench">
          <figure className="dinner-photo">
            <div className="dinner-photo-crop">
              <img
                src={photoFor(DEMO_SLUG).src}
                alt="Roast chicken with lemon and thyme"
                loading="lazy"
                width="900"
                height="1100"
              />
            </div>
            <figcaption>
              <span>{demo.ticket} / THE SUNDAY ROAST</span>
              <Link to={`/recipes/${demo.slug}`}>
                View recipe <span aria-hidden="true">↗</span>
              </Link>
            </figcaption>
          </figure>
          <div className="dinner-plan">
            <h3>
              Roast chicken.
              <br />
              No last-minute rush.
            </h3>
            <p>
              A crisp-skinned bird, a warm kitchen, and time to set the table.
              Here’s how your evening looks.
            </p>
            <label className="dinner-time" htmlFor="dinner-time">
              <span>Let’s eat at</span>
              <input
                id="dinner-time"
                type="time"
                value={serveAt}
                required
                onChange={(event) => {
                  if (event.target.value) setServeAt(event.target.value);
                }}
              />
            </label>
            <div className="plan-summary" aria-live="polite" aria-atomic="true">
              <div>
                <span>Start cooking</span>
                <strong>{plan.startLabel}</strong>
                {plan.startsYesterday && <small>The day before</small>}
              </div>
              <div>
                <span>Your time</span>
                <strong>
                  {plan.hands}
                  <small> min</small>
                </strong>
              </div>
              <div>
                <span>Time to yourself</span>
                <strong>
                  {plan.idle}
                  <small> min</small>
                </strong>
              </div>
            </div>
            <ol className="plan-preview">
              {plan.steps.slice(0, 4).map((step) => (
                <li key={step.index}>
                  <time>{step.startLabel}</time>
                  <span>{step.text}</span>
                  <small>{step.hands ? "HANDS ON" : "TAKE A BREAK"}</small>
                </li>
              ))}
            </ol>
            <Link
              className="text-link"
              to={`/recipes/${demo.slug}?at=${encodeURIComponent(serveAt)}`}
            >
              The complete prep ticket <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section
        className="weeknight-section page-frame"
        aria-labelledby="weeknight-heading"
      >
        <div className="section-intro">
          <p className="eyebrow">Less time at the stove</p>
          <h2 id="weeknight-heading">
            For an ordinary
            <br />
            extraordinary evening.
          </h2>
          <p>
            A small collection for the nights you want to cook,
            <br className="desktop-break" /> without making a night of it.
          </p>
        </div>
        <div className="weeknight-grid">
          {weeknight.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
        <Link className="text-link collection-link" to="/recipes?effort=quick">
          More low-effort recipes <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <section className="time-note page-frame" aria-labelledby="time-heading">
        <div className="time-note-lead">
          <h2 id="time-heading">
            Time in the oven.
            <br />
            Time for yourself.
          </h2>
        </div>
        <div className="time-note-copy">
          <p>
            A slow roast doesn’t have to be a busy evening. We separate the
            minutes that need you from the ones that don’t.
          </p>
          <p>
            Every recipe tells you what to do, when to do it, and when you can
            walk away.
          </p>
          <Link className="text-link" to="/method">
            How MISE works <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section
        className="recipe-collection page-frame"
        aria-labelledby="collection-heading"
      >
        <div className="collection-heading">
          <h2 id="collection-heading">
            Something
            <br />
            worth making.
          </h2>
          <span className="collection-count">
            {String(recipes.length).padStart(2, "0")} recipes,
            <br />
            kept with care.
          </span>
        </div>
        <div
          className="collection-filters"
          role="group"
          aria-label="Filter recipes by course"
        >
          {[{ id: "all", label: "Everything" }, ...COURSES].map((item) => (
            <button
              key={item.id}
              aria-pressed={course === item.id}
              onClick={() => setCourse(item.id)}
            >
              {item.label}
              <span>
                {item.id === "all"
                  ? recipes.length
                  : recipes.filter((r) => r.course === item.id).length}
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {collection.length} recipes shown
        </p>
        <div className="collection-grid">
          {collection.map((recipe) => (
            <Link
              className="collection-item"
              key={recipe.slug}
              to={`/recipes/${recipe.slug}`}
            >
              <img
                src={photoFor(recipe.slug).src}
                alt=""
                loading="lazy"
                width="112"
                height="112"
              />
              <div>
                <span className="collection-meta">
                  {recipe.ticket} / {formatDuration(activeMinutes(recipe))}{" "}
                  hands on
                </span>
                <h3>{recipe.title}</h3>
                <p>{formatDuration(totalMinutes(recipe))} total</p>
              </div>
              <span className="collection-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
