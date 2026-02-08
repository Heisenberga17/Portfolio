import ScrollVelocity from "@/components/ScrollVelocity";

const DEFAULT_ITEMS = [
  "React",
  "Astro",
  "TypeScript",
  "Tailwind CSS",
  "Cloudflare Workers",
  "Node.js",
  "REST APIs",
  "Git",
  "Figma",
  "Wrangler",
];

export default function TechStrip({ items }: { items?: string[] }) {
  const techItems = items ?? DEFAULT_ITEMS;

  // Build two text rows: join items with a separator
  const row1 = techItems.join("  \u00B7  ");
  const row2 = [...techItems].reverse().join("  \u00B7  ");

  return (
    <div style={{ overflow: "hidden", position: "relative", padding: "24px 0" }}>
      <ScrollVelocity
        texts={[row1, row2]}
        velocity={60}
        numCopies={6}
        className="font-heading text-text-primary opacity-[0.07]"
        scrollerClassName="!text-[clamp(1.5rem,4vw,2.5rem)] !font-bold !tracking-[-0.02em]"
      />
    </div>
  );
}
