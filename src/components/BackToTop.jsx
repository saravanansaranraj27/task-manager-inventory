import { useScrollVisibility } from "../hooks/useScrollVisibility";

function BackToTop({ threshold = 320 }) {
  const visible = useScrollVisibility(threshold);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

export default BackToTop;
