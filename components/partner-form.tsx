"use client";

import { useState } from "react";
import {
  CLIENT_BANDS,
  PARTNER_ROLES,
} from "@/lib/partner-schema";

type Status = "idle" | "loading" | "success" | "error";

export function PartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      full_name: String(fd.get("full_name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      role: String(fd.get("role") ?? ""),
      active_clients_band: String(fd.get("active_clients_band") ?? ""),
      region: String(fd.get("region") ?? "").trim(),
      products_note: String(fd.get("products_note") ?? "").trim(),
      extra_note: String(fd.get("extra_note") ?? "").trim(),
      source: "landing",
    };

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-6 py-8 shadow-sm"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-semibold text-emerald-900">You&apos;re in</p>
        <p className="mt-2 text-sm text-emerald-800/90">
          We&apos;ve added you to the ReferralBuddy partner network.
          Here&apos;s what happens next:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-emerald-900/90">
          <li>We review your profile (usually within 48 hours)</li>
          <li>You start receiving partnership offers to your email</li>
          <li>Accept the ones you like, ignore the rest</li>
          <li>Refer clients and earn commissions</li>
        </ol>
        <p className="mt-4 text-sm font-medium text-emerald-900">
          No fees. No commitments. You&apos;re in control.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage(null);
          }}
          className="mt-6 text-sm font-medium text-emerald-800 underline decoration-emerald-800/40 hover:decoration-emerald-800"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      noValidate={false}
      id="partner-form-inner"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-zinc-700"
          >
            Full name <span className="text-red-600">*</span>
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none ring-emerald-500/0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700"
          >
            Email address <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Where offers arrive"
            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none ring-emerald-500/0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-zinc-700"
          >
            What do you do? <span className="text-red-600">*</span>
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="" disabled>
              Select…
            </option>
            {PARTNER_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="active_clients_band"
            className="block text-sm font-medium text-zinc-700"
          >
            How many active clients? <span className="text-red-600">*</span>
          </label>
          <select
            id="active_clients_band"
            name="active_clients_band"
            required
            defaultValue=""
            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="" disabled>
              Select…
            </option>
            {CLIENT_BANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="region"
            className="block text-sm font-medium text-zinc-700"
          >
            City/region you serve <span className="text-red-600">*</span>
          </label>
          <input
            id="region"
            name="region"
            type="text"
            required
            autoComplete="address-level2"
            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="products_note"
            className="block text-sm font-medium text-zinc-700"
          >
            What products would you recommend?
          </label>
          <textarea
            id="products_note"
            name="products_note"
            rows={3}
            placeholder="e.g. software tools, supplements, insurance…"
            className="mt-1.5 w-full resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="extra_note"
            className="block text-sm font-medium text-zinc-700"
          >
            Anything else?
          </label>
          <textarea
            id="extra_note"
            name="extra_note"
            rows={2}
            className="mt-1.5 w-full resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {status === "error" && message ? (
        <p className="text-sm text-red-600" role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Submitting…" : "Join the Partner Network →"}
      </button>
    </form>
  );
}
