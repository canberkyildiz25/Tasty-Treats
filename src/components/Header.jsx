import { Link, NavLink, useLocation } from "react-router-dom";
import { useKitchen } from "../store/kitchen";

export default function Header() {
  const savedCount = useKitchen((s) => s.saved.length);
  const { pathname } = useLocation();
  return (
    <header
      className={`site-header ${pathname === "/" ? "site-header-home" : ""}`}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="header-inner">
        <Link to="/" className="wordmark" aria-label="MISE home">
          MISE<span>EVERYTHING IN ITS PLACE</span>
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/method">The MISE way</NavLink>
        </nav>
        <Link
          to="/saved"
          className="saved-link"
          aria-label={`Saved recipes, ${savedCount}`}
        >
          <span>Saved</span>
          <span className="saved-count">{savedCount}</span>
        </Link>
      </div>
    </header>
  );
}
