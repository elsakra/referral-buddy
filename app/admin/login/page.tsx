import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata = {
  title: "Admin login · OfferMatch",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const secret = process.env.ADMIN_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (secret && verifyAdminSession(token, secret)) {
    redirect("/admin");
  }

  if (!secret) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
        <p className="text-center text-zinc-600">
          Admin login is disabled until{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm">
            ADMIN_SECRET
          </code>{" "}
          is set.
        </p>
        <Link
          href="/"
          className="mt-6 text-center text-sm font-medium text-emerald-700 underline"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4 py-16">
      <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
        OfferMatch admin
      </h1>
      <p className="mt-1 text-sm text-zinc-600">Sign in to view partner signups.</p>
      <AdminLoginForm />
      <Link
        href="/"
        className="mt-8 text-center text-sm text-zinc-500 hover:text-zinc-800"
      >
        ← Home
      </Link>
    </div>
  );
}
