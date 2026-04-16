import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/admin";
import { AdminLogoutButton } from "@/components/admin-logout-button";

export const metadata = {
  title: "Partner signups · ReferralBuddy",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ drafts?: string }>;
}) {
  const secret = process.env.ADMIN_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!secret || !verifyAdminSession(token, secret)) {
    redirect("/admin/login");
  }

  const sp = await searchParams;
  const showDrafts = sp.drafts === "1";

  let rows: Array<Record<string, unknown>> = [];
  let fetchError: string | null = null;
  try {
    const supabase = createServiceClient();
    let q = supabase
      .from("partner_signups")
      .select(
        "id, created_at, full_name, email, role, active_clients_band, region, products_note, extra_note, source, is_complete, profile_url",
      );
    if (!showDrafts) {
      q = q.eq("is_complete", true);
    }
    const { data, error } = await q
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      fetchError = error.message;
    } else {
      rows = (data ?? []) as Array<Record<string, unknown>>;
    }
  } catch (e) {
    fetchError = e instanceof Error ? e.message : "Failed to load";
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900">
              Partner signups
            </h1>
            <p className="text-sm text-zinc-500">ReferralBuddy admin</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {showDrafts ? (
              <Link
                href="/admin"
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                Completed only
              </Link>
            ) : (
              <Link
                href="/admin?drafts=1"
                className="text-sm text-amber-700 hover:underline"
              >
                Include drafts
              </Link>
            )}
            <Link
              href="/"
              className="text-sm text-emerald-700 hover:underline"
            >
              View site
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {fetchError ? (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            <strong className="font-medium">Could not load data.</strong>{" "}
            {fetchError} — check{" "}
            <code className="rounded bg-red-100 px-1">SUPABASE_*</code> env vars
            and run migrations including{" "}
            <code className="rounded bg-red-100 px-1">002_partner_signups_drafts</code>
            .
          </div>
        ) : rows.length === 0 ? (
          <p className="text-zinc-600">No rows match this filter.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/80">
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-700">
                    Date
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-700">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-700">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-700">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-700">
                    Role
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-700">
                    Clients
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-700">
                    Region
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-700">
                    Profile
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={String(r.id)}
                    className="border-b border-zinc-50 last:border-0"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                      {r.created_at
                        ? new Date(String(r.created_at)).toLocaleString()
                        : "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {r.is_complete ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                          Done
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-zinc-900">
                      {String(r.full_name ?? "—")}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${String(r.email ?? "")}`}
                        className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700"
                      >
                        {String(r.email ?? "")}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      {String(r.role ?? "—")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                      {String(r.active_clients_band ?? "—")}
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      {String(r.region ?? "—")}
                    </td>
                    <td className="max-w-[8rem] truncate px-4 py-3 text-zinc-500">
                      {r.profile_url ? (
                        <a
                          href={String(r.profile_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 underline"
                        >
                          Link
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td
                      className="max-w-[12rem] truncate px-4 py-3 text-zinc-500"
                      title={
                        [r.products_note, r.extra_note]
                          .filter(Boolean)
                          .join(" · ") || undefined
                      }
                    >
                      {[r.products_note, r.extra_note].filter(Boolean).join(" · ") ||
                        "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
