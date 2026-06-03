import "./InfiniteScrollToggle.scss";

export default function InfiniteScrollToggle({
  isInfiniteScrollEnabled,
  setIsInfiniteScrollEnabled,
}: {
  isInfiniteScrollEnabled: boolean;
  setIsInfiniteScrollEnabled: (enabled: boolean) => void;
}) {
  return (
    <label className="infinite-scroll-toggle">
      <input
        type="checkbox"
        checked={isInfiniteScrollEnabled}
        onChange={(e) => setIsInfiniteScrollEnabled(e.target.checked)}
      />
      <span>Enable infinite scroll</span>
    </label>
  );
}
