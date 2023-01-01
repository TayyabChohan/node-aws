import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SubscriptionsContext } from "../../../services/subscriptions/subscriptions.context";
import { ContentBox } from "../../../components/content-box/ContentBox.component";

const SubscriptionInnerForm = ({ clientSecret }) => {
  const { user, setUser } = useContext(AuthenticationContext);
  const { planType } = useContext(SubscriptionsContext);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    //disable the button
    const submitBtn = document.getElementById("stripe-payment-button");
    submitBtn.disabled = true;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://creativeu.live/profile",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      alert(
        "The payment has failed. Please try again later, or try a different payment method."
      );
    } else {
      setUser({ ...user, accountActive: true });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "800px", maxWidth: "99vw", marginTop: "80px" }}
    >
      <ContentBox titleText="Checkout" titlePosition="right">
        <div
          style={{
            marginTop: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ color: "white", fontFamily: "Noto Sans Display" }}>
            1x CreativeU{" "}
            {(() => {
              switch (planType) {
                case "monthly":
                  return "Monthly";
                case "yearly":
                  return "Yearly";
                case "lifetime":
                  return "Lifetime";
                case "artistpack":
                  return "Artist Pack";
                default:
                  return "ERROR";
              }
            })()}{" "}
            Plan
          </h3>
          <h3 style={{ color: "white", fontFamily: "Noto Sans Display" }}>
            {(() => {
              switch (planType) {
                case "monthly":
                  return "$32.59 / month*";
                case "yearly":
                  return "$271.56 / year*";
                case "lifetime":
                  return "$1,629.38 (one time payment)*";
                case "artistpack":
                  return "$1 (for three months, select a plan after that)*";
                default:
                  return "ERROR";
              }
            })()}{" "}
          </h3>
        </div>
        <p style={{ color: "white", fontFamily: "Noto Sans Display" }}>
          *Includes sales tax
        </p>
        <h3 style={{ color: "white", fontFamily: "Noto Sans Display" }}>
          Payment Information
        </h3>
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <PaymentElement />
        </div>
        <button
          disabled={!stripe}
          className="btn"
          style={{ marginTop: "40px" }}
          id="stripe-payment-button"
        >
          Submit
        </button>
      </ContentBox>
    </form>
  );
};

export const SubscriptionForm = ({ planRef }) => {
  const stripePromise = loadStripe(
    ""
    //""
  );

  const { clientSecret } = useContext(SubscriptionsContext);
  const options = {
    clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <SubscriptionInnerForm clientSecret={clientSecret} planRef={planRef} />
    </Elements>
  );
};
