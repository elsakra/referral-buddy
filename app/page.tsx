import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FaqSection } from "@/components/faq-section";
import { PartnerForm } from "@/components/partner-form";
import { HeroStack } from "@/components/premium/hero-stack";
import { CAL_DEMO_URL } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="partners" className="-mt-14">
        {/* Partner hero — pt clears sticky header; bg fills behind transparent nav */}
        <section className="relative overflow-hidden bg-rb-terracotta pb-20 pt-24 text-white sm:pb-28 sm:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(255,255,255,0.12),transparent)]" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-xl shrink-0">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                For partners
              </p>
              <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
                Earn commissions recommending products your clients already need.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/85">
                Brands want professionals with trusted relationships—not cold ads.
                Join in one minute. Partnership offers arrive by email. You only
                earn.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#partner-form" className="rb-btn-secondary sm:min-w-[220px]">
                  Join the Partner Network
                </a>
                <p className="text-sm text-white/70">
                  No fees · No commitments · ~60 seconds
                </p>
              </div>
            </div>
            <HeroStack />
          </div>
        </section>

        {/* How it works — partners */}
        <section
          className="border-t border-rb-sand/80 bg-rb-cream"
          aria-labelledby="how-partners"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rb-terracotta">
              The workflow
            </p>
            <h2
              id="how-partners"
              className="font-display mt-3 text-3xl font-semibold tracking-tight text-rb-chocolate sm:text-4xl"
            >
              How it works
            </h2>
            <ol className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Sign up in 60 seconds",
                  body: "Tell us what you do, where you’re based, and how many clients you serve.",
                },
                {
                  step: "2",
                  title: "Receive partnership offers",
                  body: "When a brand matches your profile, we email the product, commission, and terms.",
                },
                {
                  step: "3",
                  title: "Accept or pass",
                  body: "One click to accept. Not interested? Ignore it. No calls required.",
                },
                {
                  step: "4",
                  title: "Refer and earn",
                  body: "Recommend to clients. When they buy, you earn—we handle tracking.",
                },
              ].map((item) => (
                <li key={item.step}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-rb-terracotta shadow-sm ring-1 ring-rb-sand">
                    {item.step}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-rb-chocolate">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-rb-text-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-rb-cream-deep/50" aria-labelledby="who-for">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2
              id="who-for"
              className="font-display text-3xl font-semibold tracking-tight text-rb-chocolate sm:text-4xl"
            >
              Who this is for
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Personal trainers and fitness coaches with active clients",
                "Independent insurance agents recommending products",
                "Marketing freelancers or agencies placing tools for clients",
                "Accountants, bookkeepers, financial advisors",
                "Real estate agents, web designers, beauty professionals",
                "Anyone whose clients trust their recommendations",
              ].map((line) => (
                <li
                  key={line}
                  className="rb-card flex gap-3 px-5 py-4 text-sm text-rb-chocolate"
                >
                  <span className="mt-0.5 text-rb-terracotta" aria-hidden>
                    ✓
                  </span>
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
          className="scroll-mt-24 border-t border-rb-sand/80 bg-white"
          aria-labelledby="form-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-xl">
              <h2
                id="form-heading"
                className="font-display text-3xl font-semibold tracking-tight text-rb-chocolate"
              >
                Join the partner network
              </h2>
              <p className="mt-3 text-rb-text-muted">
                Get paid to recommend products to your existing clients. No fees,
                no commitments—just offers that fit your practice.
              </p>
              <div className="mt-10">
                <PartnerForm />
              </div>
            </div>
            <div className="mx-auto mt-16 max-w-xl text-center">
              <p className="font-display text-xl font-semibold text-rb-chocolate">
                Prefer a guided flow?
              </p>
              <p className="mt-2 text-sm text-rb-text-muted">
                Use our short step-by-step signup—perfect from email or DM.
              </p>
              <Link
                href="/join"
                className="rb-btn-primary mt-6 inline-flex"
              >
                Open the quick apply page
              </Link>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section
          id="brands"
          className="scroll-mt-20 border-t border-rb-chocolate-mid bg-rb-chocolate text-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              For brands
            </p>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
              Warm introductions—not cold outbound.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              ReferralBuddy connects you with professionals who already have your
              buyers’ trust. Pay when referrals become sales.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a
                href={CAL_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-rb-chocolate shadow-lg transition hover:bg-rb-cream"
              >
                Book a 15-minute demo
              </a>
              <span className="text-sm text-white/55">
                <a
                  href={CAL_DEMO_URL}
                  className="font-medium text-white underline decoration-white/30 hover:decoration-white"
                >
                  cal.com/elsakr
                </a>{" "}
                · Free to join · Pay for results only
              </span>
            </div>
          </div>
        </section>

        <section className="border-t border-rb-chocolate-mid bg-rb-chocolate-mid text-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h3 className="font-display text-2xl font-semibold">Why brands use ReferralBuddy</h3>
            <ul className="mt-12 grid gap-10 md:grid-cols-3">
              {[
                {
                  title: "Pre-vetted partners",
                  body: "Professionals opted in with client ranges and what they’re open to recommending.",
                },
                {
                  title: "Pay only for results",
                  body: "No listing fees or subscriptions. You set commissions and pay on closed sales.",
                },
                {
                  title: "Launch in days",
                  body: "Skip building a partner program from scratch—post an offer, get matched, earn.",
                },
              ].map((item) => (
                <li key={item.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <h4 className="font-display text-lg font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-black/20 bg-[#1a0f0c] text-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h3 className="font-display text-2xl font-semibold">
              How it works for brands
            </h3>
            <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Book a demo",
                  body: "15 minutes—we learn your product and ideal partner profile.",
                },
                {
                  step: "2",
                  title: "We publish your offer",
                  body: "Commission structure and partner criteria, ready to match.",
                },
                {
                  step: "3",
                  title: "Partners opt in",
                  body: "Matched partners accept or decline with one click—no spam.",
                },
                {
                  step: "4",
                  title: "Referrals flow",
                  body: "Partners refer; you pay commissions on actual sales.",
                },
              ].map((item) => (
                <li key={item.step}>
                  <span className="text-sm font-bold text-rb-terracotta">
                    {item.step}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-semibold">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/60">{item.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-16 text-center">
              <p className="text-lg text-white/80">
                See whether ReferralBuddy fits your go-to-market.
              </p>
              <a
                href={CAL_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-xl bg-rb-terracotta px-6 py-3.5 text-base font-semibold text-white hover:bg-rb-terracotta-dark"
              >
                Book a 15-minute demo
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
