import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FaqSection } from "@/components/faq-section";
import { PartnerForm } from "@/components/partner-form";
import { CAL_DEMO_URL } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="partners">
        {/* Partner hero */}
        <section className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-b from-emerald-50/40 to-white">
          <div className="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-800/80">
              For partners
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl sm:leading-[1.1]">
              Earn commissions by recommending products to your existing
              clients.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
              Brands are looking for professionals like you to be their referral
              partners. Sign up in 60 seconds. Get partnership offers to your
              inbox. You only earn.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#partner-form"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Join the Partner Network →
              </a>
              <p className="text-sm text-zinc-500">
                No fees. No commitments. Takes 60 seconds.
              </p>
            </div>
          </div>
        </section>

        {/* How it works — partners */}
        <section className="border-b border-zinc-100 bg-white" aria-labelledby="how-partners">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2
              id="how-partners"
              className="text-2xl font-semibold tracking-tight text-zinc-900"
            >
              How it works
            </h2>
            <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Sign up in 60 seconds",
                  body: "Fill out a short form about what you do, where you’re based, and how many clients you have.",
                },
                {
                  step: "2",
                  title: "Receive partnership offers",
                  body: "When a brand matches your profile, we send the opportunity to your inbox with product details, commission rate, and terms.",
                },
                {
                  step: "3",
                  title: "Accept or pass",
                  body: "Like the offer? Accept with one click. Not interested? Ignore it. No pressure.",
                },
                {
                  step: "4",
                  title: "Refer and earn",
                  body: "Recommend the product to your clients. When they buy, you earn. We handle tracking and payments.",
                },
              ].map((item) => (
                <li key={item.step}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-semibold text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-zinc-50/80" aria-labelledby="who-for">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2
              id="who-for"
              className="text-2xl font-semibold tracking-tight text-zinc-900"
            >
              Who is this for
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Personal trainers and fitness coaches with active clients",
                "Independent insurance agents recommending products",
                "Marketing freelancers or agencies placing tools for clients",
                "Accountants, bookkeepers, financial advisors",
                "Real estate agents, web designers, beauty professionals",
                "Anyone with clients who trust their recommendations",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-2 text-sm text-zinc-700 before:content-['✓'] before:font-medium before:text-emerald-600"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSection />

        {/* Partner form + bottom CTA */}
        <section
          id="partner-form"
          className="border-t border-zinc-100 bg-white scroll-mt-20"
          aria-labelledby="form-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-xl">
              <h2
                id="form-heading"
                className="text-2xl font-semibold tracking-tight text-zinc-900"
              >
                Join the ReferralBuddy Partner Network
              </h2>
              <p className="mt-2 text-zinc-600">
                Get paid to recommend products and services to your existing
                clients. No fees, no commitments. Fill this out and start
                receiving partnership offers.
              </p>
              <div className="mt-10">
                <PartnerForm />
              </div>
            </div>
            <div className="mx-auto mt-16 max-w-xl text-center">
              <p className="text-lg font-medium text-zinc-900">
                Ready to start earning?
              </p>
              <a
                href="#partner-form"
                className="mt-4 inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white hover:bg-emerald-700"
              >
                Join the Partner Network →
              </a>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section
          id="brands"
          className="scroll-mt-20 border-t border-zinc-200 bg-zinc-900 text-zinc-100"
        >
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-400/90">
              For brands
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Get hundreds of professionals referring your product to their
              clients.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-zinc-300">
              ReferralBuddy connects your brand with trusted professionals who
              recommend products to their existing clients. You only pay for
              results.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={CAL_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-zinc-950 shadow-sm transition hover:bg-emerald-400"
              >
                Book a 15-Minute Demo →
              </a>
              <span className="text-sm text-zinc-400">
                <a
                  href={CAL_DEMO_URL}
                  className="text-emerald-400 underline decoration-emerald-400/40 hover:decoration-emerald-400"
                >
                  cal.com/elsakr
                </a>{" "}
                · Free to join. Pay only for results.
              </span>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-800 bg-zinc-900">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h3 className="text-xl font-semibold text-white">Value props</h3>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Pre-vetted partners, not cold leads",
                  body: "Every partner has opted in, listed their client count, and specified what they’re open to recommending.",
                },
                {
                  title: "Pay only for results",
                  body: "No listing fees. No subscription. You set your commission rate. Pay only when a referral becomes a sale.",
                },
                {
                  title: "Launch in days, not months",
                  body: "No need to build your own partner program. Post an offer, get matched, start generating referral revenue.",
                },
              ].map((item) => (
                <li key={item.title}>
                  <h4 className="font-semibold text-emerald-300">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h3 className="text-xl font-semibold text-white">
              How it works for brands
            </h3>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Book a demo",
                  body: "15-minute call. We learn about your product and ideal partner profile.",
                },
                {
                  step: "2",
                  title: "We create your offer",
                  body: "Partnership offer with your commission structure and partner criteria.",
                },
                {
                  step: "3",
                  title: "Partners get matched",
                  body: "We distribute to matching partners. They accept or decline with one click.",
                },
                {
                  step: "4",
                  title: "Referrals flow",
                  body: "Partners recommend your product. You pay commissions only on actual sales.",
                },
              ].map((item) => (
                <li key={item.step}>
                  <span className="text-sm font-bold text-emerald-500">
                    {item.step}
                  </span>
                  <h4 className="mt-2 font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 text-center">
              <p className="text-lg text-zinc-300">
                See how ReferralBuddy can drive sales for your brand.
              </p>
              <a
                href={CAL_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-zinc-950 hover:bg-emerald-400"
              >
                Book a 15-Minute Demo →
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
