import { sendOrderConfirmationEmail } from "../../../../../../shared-email/order-email.js";

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
