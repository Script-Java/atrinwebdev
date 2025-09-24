export default function ScoreRing({ label, score }) {
  const value = Math.max(0, Math.min(100, Number(score) || 0));
  const color =
    value >= 90 ? "text-success" : value >= 50 ? "text-warning" : "text-error";
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`radial-progress ${color}`}
        style={{ "--value": value, "--size": "4.5rem", "--thickness": "6px" }}
        role="progressbar"
      >
        {Number.isFinite(value) ? value : "—"}
      </div>
      <div className="text-xs opacity-70">{label}</div>
    </div>
  );
}
