import { Link } from "react-router-dom";
import {
  totalMinutes,
  activeMinutes,
  formatDuration,
  KITCHENS,
} from "../data/recipes";
import { photoFor } from "../data/photos";
import { useKitchen } from "../store/kitchen";

export default function RecipeCard({ recipe }) {
  const saved = useKitchen((s) => s.saved.includes(recipe.slug));
  const kitchen = KITCHENS.find((k) => k.id === recipe.kitchen);
  const photo = photoFor(recipe.slug);
  return (
    <Link to={`/recipes/${recipe.slug}`} className="recipe-card">
      {photo && (
        <div className="recipe-card-image">
          <img src={photo.src} alt="" loading="lazy" width="800" height="650" />
        </div>
      )}
      <div className="recipe-card-body">
        <div className="recipe-card-meta">
          <span>
            {recipe.ticket} / {kitchen?.label}
          </span>
          {saved && <span>Saved</span>}
          <span aria-hidden="true">↗</span>
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.short}</p>
        <dl>
          <div>
            <dt>Hands on</dt>
            <dd>{formatDuration(activeMinutes(recipe))}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatDuration(totalMinutes(recipe))}</dd>
          </div>
          <div>
            <dt>Serves</dt>
            <dd>{recipe.serves}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
