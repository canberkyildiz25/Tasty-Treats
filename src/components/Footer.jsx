import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer page-frame">
      <div className="footer-top">
        <p>
          Less rush.
          <br />
          More around the table.
        </p>
        <Link className="text-link" to="/recipes">
          Make something good <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        MISE
      </div>
      <div className="footer-bottom">
        <p>A kitchen companion by Canberk Yildiz.</p>
        <nav aria-label="Footer navigation">
          <Link to="/recipes">Recipes</Link>
          <Link to="/method">The MISE way</Link>
          <Link to="/saved">Saved</Link>
        </nav>
        <p>Made for the everyday.</p>
      </div>
      <p className="footer-credits">
        Recipe photographs: Wikimedia Commons, CC BY / CC BY-SA. Credits on each
        recipe. Kitchen atmosphere: AI-generated. Your saved recipes stay in
        this browser.
      </p>
    </footer>
  );
}
