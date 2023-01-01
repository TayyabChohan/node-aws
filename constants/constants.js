const ALLOWED_ORIGINS = [
  "creativeu.live",
  "creativeu-app.live",
  //"http://creativeu2-env.eba-h38mfdrw.us-east-2.elasticbeanstalk.com", //original environment
  "creativeuproduction-env.eba-jr4zejhn.us-east-2.elasticbeanstalk.com",
  "creativeucluster.wvuoo.mongodb.net",
  //origins permitted for stripe integration --these might need to be prefixed with
  //http / https, or this part of the origin might need to be trimmed before checking this array
  "a.stripecdn.com",
  "api.stripe.com",
  "atlas.stripe.com",
  "auth.stripe.com",
  "b.stripecdn.com",
  "billing.stripe.com",
  "buy.stripe.com",
  "c.stripecdn.com",
  "checkout.stripe.com",
  "climate.stripe.com",
  "connect.stripe.com",
  "dashboard.stripe.com",
  "express.stripe.com",
  "files.stripe.com",
  "hooks.stripe.com",
  "invoice.stripe.com",
  "invoicedata.stripe.com",
  "js.stripe.com",
  "m.stripe.com",
  "m.stripe.network",
  "manage.stripe.com",
  "pay.stripe.com",
  "payments.stripe.com",
  "q.stripe.com",
  "qr.stripe.com",
  "r.stripe.com",
  "verify.stripe.com",
  "stripe.com",
  "terminal.stripe.com",
  "uploads.stripe.com",
];

const ALLOWED_WEBHOOK_IP_ADDRESSES = [
  "3.18.12.63",
  "3.130.192.231",
  "13.235.14.237",
  "13.235.122.149",
  "18.211.135.69",
  "35.154.171.200",
  "52.15.183.38",
  "54.88.130.119",
  "54.88.130.237",
  "54.187.174.169",
  "54.187.205.235",
  "54.187.216.72",
];

module.exports.ALLOWED_ORIGINS = ALLOWED_ORIGINS;
module.exports.ALLOWED_WEBHOOK_IP_ADDRESSES = ALLOWED_WEBHOOK_IP_ADDRESSES;
