import { sendOrderConfirmationEmail } from "../../../../../../shared-email/order-email.js";
// On the VPS, this site is deployed one level deeper than the site name
// (/var/www/novera/app/ is the project root, not /var/www/novera/), so this
// needs 6 dirs back to reach /var/www/shared-email/, not the usual 5 (novera
// has an extra src/ level vs. peptiq/luxen/lumivex/vora's plain app/ root).
// NOTE: this makes local builds fail (no shared-email/ one level above
// Dev/frontend/) — intentional, VPS-only fix; see vora's route.js for context.

type SendOrderConfirmationBody = {
  customer: { name: string; email: string };
  order: Record<string, unknown>;
};

export async function POST(request: Request) {
  const { customer, order } = (await request.json()) as SendOrderConfirmationBody;

  const result = await sendOrderConfirmationEmail({
    domain: request.headers.get("host") ?? "",
    customer,
    order,
  });

  return Response.json(result, { status: result.success ? 200 : 502 });
}
