"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CLIENT_BANDS,
  PARTNER_ROLES,
} from "@/lib/partner-schema";

const STORAGE_KEY = "referralbuddy_partner_draft_id";

type FieldStep =
  | "email"
  | "full_name"
  | "role"
  | "active_clients_band"
  | "region"
  | "profile_url"
  | "products_note"
  | "extra_note";

const STEP_ORDER: FieldStep[] = [
  "email",
  "full_name",
  "role",
  "active_clients_band",
  "region",
  "profile_url",
  "products_note",
  "extra_note",
];

export function TypeformFlow({
  prefilledEmail,
  prefilledFirstName,
}: {
  prefilledEmail?: string;
  prefilledFirstName?: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const idRef = useRef<string | null>(null);

  const [step, setStep] = useState<FieldStep | "success">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [band, setBand] = useState("");
  const [region, setRegion] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [productsNote, setProductsNote] = useState("");
  const [extraNote, setExtraNote] = useState("");

  const persistUrl = useCallback(
    (id: string) => {
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* ignore */
      }
      router.replace(`/join?d=${encodeURIComponent(id)}`, { scroll: false });
    },
    [router],
  );

  const patchDraft = useCallback(
    async (patch: Record<string, string>): Promise<boolean> => {
      setError(null);
      try {
        const res = await fetch("/api/partners/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: idRef.current ?? undefined,
            patch: {
              ...patch,
              source: "cold_email",
            },
          }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          id?: string;
        };
        if (!res.ok) {
          setError(data.error ?? "Could not save. Try again.");
          return false;
        }
        if (data.id) {
          idRef.current = data.id;
          persistUrl(data.id);
        }
        return true;
      } catch {
        setError("Network error.");
        return false;
      }
    },
    [persistUrl],
  );

  useEffect(() => {
    const fromUrl = sp.get("d");
    const fromStore =
      typeof window !== "undefined"
        ? sessionStorage.getItem(STORAGE_KEY)
        : null;
    const id = fromUrl || fromStore;
    if (id && /^[0-9a-f-]{36}$/i.test(id)) {
      idRef.current = id;
    }
    if (prefilledEmail) setEmail(prefilledEmail);
    if (prefilledFirstName) setFullName(prefilledFirstName);
    const qEmail = sp.get("email");
    if (qEmail) setEmail(decodeURIComponent(qEmail));
    const qFirst = sp.get("first_name");
    if (qFirst) setFullName(decodeURIComponent(qFirst));
  }, [sp, prefilledEmail, prefilledFirstName]);

  const go = useCallback(
    async (next: FieldStep, patch: Record<string, string>) => {
      setLoading(true);
      const ok = await patchDraft(patch);
      setLoading(false);
      if (ok) setStep(next);
    },
    [patchDraft],
  );

  async function finalizeApplication() {
    const id = idRef.current;
    if (!id) {
      setError("Session expired. Start again from your email.");
      setStep("email");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/partners/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setError(
          data.error ??
            "Could not submit. If this persists, refresh and try again.",
        );
        setLoading(false);
        return;
      }
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      idRef.current = null;
      setStep("success");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  async function onContinue() {
    setError(null);
    if (step === "email") {
      const v = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        setError("Enter a valid email.");
        return;
      }
      await go("full_name", { email: v });
      return;
    }
    if (step === "full_name") {
      const v = fullName.trim();
      if (v.length < 2) {
        setError("Enter your name.");
        return;
      }
      await go("role", { full_name: v });
      return;
    }
    if (step === "role") {
      if (!role || !PARTNER_ROLES.includes(role as (typeof PARTNER_ROLES)[number])) {
        setError("Choose what best describes you.");
        return;
      }
      await go("active_clients_band", { role });
      return;
    }
    if (step === "active_clients_band") {
      if (!band || !CLIENT_BANDS.includes(band as (typeof CLIENT_BANDS)[number])) {
        setError("Select your client range.");
        return;
      }
      await go("region", { active_clients_band: band });
      return;
    }
    if (step === "region") {
      const v = region.trim();
      if (v.length < 2) {
        setError("Add your city or region.");
        return;
      }
      await go("profile_url", { region: v });
      return;
    }
    if (step === "profile_url") {
      await go("products_note", { profile_url: profileUrl.trim() || "" });
      return;
    }
    if (step === "products_note") {
      await go("extra_note", { products_note: productsNote.trim() || "" });
      return;
    }
    if (step === "extra_note") {
      setLoading(true);
      const ok = await patchDraft({ extra_note: extraNote.trim() || "" });
      setLoading(false);
      if (!ok) return;
      await finalizeApplication();
    }
  }

  async function onSkip() {
    if (step === "profile_url") {
      await go("products_note", { profile_url: "" });
    } else if (step === "products_note") {
      await go("extra_note", { products_note: "" });
    } else if (step === "extra_note") {
      setLoading(true);
      const ok = await patchDraft({ extra_note: "" });
      setLoading(false);
      if (!ok) return;
      await finalizeApplication();
    }
  }

  const idx = STEP_ORDER.indexOf(step === "success" ? "extra_note" : step);
  const total = STEP_ORDER.length;
  const progress =
    step === "success" ? 100 : Math.min(100, ((idx + 1) / total) * 100);

  if (step === "success") {
    return (
      <div className="rb-card mx-auto max-w-lg px-8 py-12 text-center">
        <p className="font-display text-3xl font-semibold text-rb-chocolate">
          You&apos;re in
        </p>
        <p className="mt-4 text-sm leading-relaxed text-rb-text-muted">
          We&apos;ll email you when partnership offers match your profile.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block text-sm font-semibold text-rb-terracotta underline"
        >
          Back to ReferralBuddy
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div
        className="mb-10 h-1.5 overflow-hidden rounded-full bg-rb-sand"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-rb-terracotta transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rb-terracotta">
        Step {idx + 1} of {total}
      </p>

      {step === "email" ? (
        <>
          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-rb-chocolate sm:text-4xl">
            Where should we send partnership offers?
          </h1>
          <p className="mt-3 text-sm text-rb-text-muted">
            Use the email you check for client work.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="rb-input mt-8 text-lg"
            placeholder="you@company.com"
            autoFocus
          />
        </>
      ) : null}

      {step === "full_name" ? (
        <>
          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-rb-chocolate sm:text-4xl">
            What should we call you?
          </h1>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            className="rb-input mt-8 text-lg"
            placeholder="Full name"
            autoFocus
          />
        </>
      ) : null}

      {step === "role" ? (
        <>
          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-rb-chocolate sm:text-4xl">
            What do you do?
          </h1>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rb-input mt-8 text-lg"
            autoFocus
          >
            <option value="">Choose one…</option>
            {PARTNER_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </>
      ) : null}

      {step === "active_clients_band" ? (
        <>
          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-rb-chocolate sm:text-4xl">
            How many active clients do you serve?
          </h1>
          <select
            value={band}
            onChange={(e) => setBand(e.target.value)}
            className="rb-input mt-8 text-lg"
            autoFocus
          >
            <option value="">Select range…</option>
            {CLIENT_BANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </>
      ) : null}

      {step === "region" ? (
        <>
          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-rb-chocolate sm:text-4xl">
            Which city or region do you primarily serve?
          </h1>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            autoComplete="address-level2"
            className="rb-input mt-8 text-lg"
            placeholder="e.g. Austin, TX"
            autoFocus
          />
        </>
      ) : null}

      {step === "profile_url" ? (
        <>
          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-rb-chocolate sm:text-4xl">
            Add LinkedIn or a website (optional)
          </h1>
          <p className="mt-3 text-sm text-rb-text-muted">
            Helps brands trust your profile. Skip if you prefer.
          </p>
          <input
            type="text"
            inputMode="url"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            className="rb-input mt-8"
            placeholder="LinkedIn or website URL"
            autoFocus
          />
        </>
      ) : null}

      {step === "products_note" ? (
        <>
          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-rb-chocolate sm:text-4xl">
            What might you recommend to clients?
          </h1>
          <p className="mt-3 text-sm text-rb-text-muted">
            Optional — a few words is enough.
          </p>
          <textarea
            value={productsNote}
            onChange={(e) => setProductsNote(e.target.value)}
            className="rb-input mt-8 min-h-[7rem]"
            placeholder="e.g. SaaS tools, wellness products…"
            autoFocus
          />
        </>
      ) : null}

      {step === "extra_note" ? (
        <>
          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-rb-chocolate sm:text-4xl">
            Anything else we should know?
          </h1>
          <textarea
            value={extraNote}
            onChange={(e) => setExtraNote(e.target.value)}
            className="rb-input mt-8 min-h-[7rem]"
            placeholder="Optional"
            autoFocus
          />
        </>
      ) : null}

      {error ? (
        <p className="mt-6 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => void onContinue()}
          disabled={loading}
          className="rb-btn-primary min-h-[52px] w-full sm:w-auto"
        >
          {loading
            ? "Working…"
            : step === "extra_note"
              ? "Submit application"
              : "Continue"}
        </button>
        {(step === "profile_url" ||
          step === "products_note" ||
          step === "extra_note") && (
          <button
            type="button"
            onClick={() => void onSkip()}
            disabled={loading}
            className="text-sm font-semibold text-rb-text-muted hover:text-rb-chocolate"
          >
            Skip for now
          </button>
        )}
      </div>

      <p className="mt-10 text-center text-xs text-rb-text-muted">
        Under 60 seconds · No fees · We never sell your email
      </p>
    </div>
  );
}
