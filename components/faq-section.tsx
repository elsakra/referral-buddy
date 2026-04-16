const faqs = [
  {
    q: "Does it cost anything?",
    a: "No. Joining is free. You only earn commissions.",
  },
  {
    q: "Do I have to accept every offer?",
    a: "No. You choose which partnerships fit. Ignore the rest.",
  },
  {
    q: "How do I get paid?",
    a: "Commissions are tracked and paid monthly.",
  },
  {
    q: "How much can I earn?",
    a: "It depends on the partnership. Some partners earn $200/mo, others $5,000+.",
  },
  {
    q: "Do I need a large following?",
    a: "No. Twenty loyal clients is more valuable than twenty thousand followers.",
  },
];

export function FaqSection() {
  return (
    <section
      className="border-t border-rb-sand/80 bg-rb-cream"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rb-terracotta">
          Questions
        </p>
        <h2
          id="faq-heading"
          className="font-display mt-3 text-3xl font-semibold tracking-tight text-rb-chocolate sm:text-4xl"
        >
          FAQ
        </h2>
        <div className="mt-10 divide-y divide-rb-sand/60 rounded-2xl border border-rb-sand/80 bg-white shadow-sm">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group px-5 py-5 first:rounded-t-2xl last:rounded-b-2xl sm:px-8"
            >
              <summary className="cursor-pointer list-none font-medium text-rb-chocolate marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span
                    className="text-rb-text-muted transition group-open:rotate-180"
                    aria-hidden
                  >
                    ▼
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-rb-text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
