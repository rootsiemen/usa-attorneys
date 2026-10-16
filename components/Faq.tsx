import type { Faq as FaqType } from "@/lib/data";

export function Faq({ items }: { items: FaqType[] }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={i}>
          <summary>{f.q}</summary>
          <div className="faq-body">
            <p style={{ margin: 0 }}>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
