//confirm that stripe keys exists, if not exit the application
if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PUBLISHABLE_KEY) {
  process.exit();
}

module.exports = function (app, stripe) {
  app.post("/payments/create-subscription", async (req, res) => {
    const customerId = req.body.customerId;

    // Create the subscription
    const priceId = req.body.priceId;

    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      });
      res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: { message: error.message } });
    }
  });

  app.post("/payments/create-lifetime-membership", async (req, res) => {
    const customerId = req.body.customerId;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 162938,
      customer: customerId,
      currency: "usd",
      metadata: {
        lifetimeMembership: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

  app.post("/payments/create-ap-membership", async (req, res) => {
    const { customerId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 32588,
      customer: customerId,
      currency: "usd",
      metadata: {
        apMembership: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
};
