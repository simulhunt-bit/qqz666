export default function Ticker({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="bg-ink text-paper overflow-hidden py-4 border-y border-line">
      <div className="ticker-track flex gap-16 whitespace-nowrap w-max font-mono text-sm">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-2.5">
            <span className="text-mango text-[11px]">▲</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
