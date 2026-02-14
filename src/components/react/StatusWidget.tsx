const STATUS_ITEMS = [
  { key: "Built", value: "Massport" },
  { key: "Shipped", value: "MicroClean" },
  { key: "Launched", value: "Casa 24 Records" },
  { key: "Based in", value: "Panama City" },
];

export default function StatusWidget() {
  return (
    <div className="border-l-2 border-accent-primary pl-6 space-y-5">
      <p className="font-mono text-xs text-text-secondary tracking-widest uppercase">
        Currently
      </p>
      {STATUS_ITEMS.map((item, i) => (
        <div key={i}>
          <span className="font-mono text-xs text-accent-secondary">
            {item.key}
          </span>
          <p className="font-heading text-text-primary text-sm font-medium mt-0.5">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
