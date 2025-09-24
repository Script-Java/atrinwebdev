export default function Section({ title, right, children }) {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex items-center justify-between gap-3">
          <h2 className="card-title">{title}</h2>
          {right}
        </div>
        {children}
      </div>
    </div>
  );
}
