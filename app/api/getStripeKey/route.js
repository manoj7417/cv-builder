
export default function handler(req, res) {
    const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY;
    
    if (!stripeKey) {
      return res.status(500).json({ error: "Stripe key not found" });
    }
  
    res.status(200).json({ stripeKey });
  }
  