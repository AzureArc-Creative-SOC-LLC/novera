import { sendOrderConfirmationEmail } from "../../../../../shared-email/order-email.js";
// On the VPS, sites are deployed flat as /var/www/<site>/, sibling to
// /var/www/shared-email/ — 5 dirs back from this route to the site root's
// parent, then into shared-email.

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
