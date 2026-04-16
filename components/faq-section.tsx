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
    <section className="border-t border-zinc-100 bg-white" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2
          id="faq-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900"
        >
          FAQ
        </h2>
        <div className="mt-8 divide-y divide-zinc-100 rounded-2xl border border-zinc-100 bg-zinc-50/50">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group px-4 py-4 first:rounded-t-2xl last:rounded-b-2xl sm:px-6"
            >
              <summary className="cursor-pointer list-none font-medium text-zinc-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-2">
                  {item.q}
                  <span
                    className="text-zinc-400 transition group-open:rotate-180"
                    aria-hidden
                  >
                    ▼
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
