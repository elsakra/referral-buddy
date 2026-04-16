/**
 * Incoming Slack webhook for new partner signups (server-only).
 * Set SLACK_WEBHOOK_URL in Vercel Production (or .env.local). Do not commit the URL.
 */
export type SignupSlackPayload = {
  channel: "landing" | "join";
  id: string;
  email: string;
  fullName: string | null;
  role: string | null;
  region: string | null;
  activeClientsBand: string | null;
  source: string | null;
  profileUrl?: string | null;
};

export async function notifySignupSlack(payload: SignupSlackPayload): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL?.trim();
  if (!url?.startsWith("https://hooks.slack.com/")) {
    console.warn(
      "[signup] Slack skipped: set SLACK_WEBHOOK_URL to a https://hooks.slack.com/ URL (Vercel → Environment Variables → Production)",
    );
    return;
  }

  const lines = [
    `*New OfferMatch partner signup* (${payload.channel})`,
    `• *Email:* ${payload.email}`,
    `• *Name:* ${payload.fullName ?? "—"}`,
    `• *Role:* ${payload.role ?? "—"}`,
    `• *Clients:* ${payload.activeClientsBand ?? "—"}`,
    `• *Region:* ${payload.region ?? "—"}`,
    `• *Source:* ${payload.source ?? "—"}`,
    `• *ID:* \`${payload.id}\``,
  ];
  if (payload.profileUrl) {
    lines.splice(7, 0, `• *Profile:* ${payload.profileUrl}`);
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lines.join("\n") }),
    });
    if (!res.ok) {
      console.error("Slack webhook failed:", res.status);
    }
  } catch (e) {
    console.error("Slack webhook error:", e);
  }
}
