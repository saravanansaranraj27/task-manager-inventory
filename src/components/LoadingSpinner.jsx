function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-spinner" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
