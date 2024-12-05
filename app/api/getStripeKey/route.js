// pages/api/getStripeKey.js

export async function GET(req) {
  try {
    const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY;

    if (!stripeKey) {
      throw new Error('Stripe key not found');
    }

    // Respond with the Stripe key
    return new Response(
      JSON.stringify({ stripeKey }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // Handle any errors that may occur
    const errorMessage = error.message || "Error fetching Stripe key";
    const statusCode = error.statusCode || 500;

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
