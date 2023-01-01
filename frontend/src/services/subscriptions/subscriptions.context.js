import React, { useState, createContext } from "react";
import {
  createSubscription,
  createLifetimeMembershipPaymentIntent,
  createAPMembershipPaymentIntent,
} from "./subscriptions.service";

export const SubscriptionsContext = createContext();

export const SubscriptionsContextProvider = ({ children }) => {
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [planType, setPlanType] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  const onSubscriptionRequest = (user, type) => {
    return new Promise(async (resolve, reject) => {
      if (!user) reject("No user found.");
      const { stripeCustomerID: customerId } = user;
      if (type === "monthly" || type === "yearly") {
        let priceId;
        switch (type) {
          case "monthly":
            priceId = "price_1L3Zy8K5nziMyc2XdyVc7N88"; //"price_1L7vktK5nziMyc2XqSNbml89";
            break;
          case "yearly":
            priceId = "price_1L3a0DK5nziMyc2XO4MKRsTo"; //"price_1L7vlWK5nziMyc2XDA54XxZj";
            break;
          default:
            priceId = "price_1L3Zy8K5nziMyc2XdyVc7N88"; //default case is monthly "price_1L7vktK5nziMyc2XqSNbml89";
        }
        try {
          const newSub = await createSubscription(customerId, priceId);
          setSubscriptionId(newSub.subscriptionId);
          setClientSecret(newSub.clientSecret);
          setPlanType(type);
          resolve();
        } catch (e) {
          setError(e);
          reject(e);
        }
      } else if (type === "lifetime") {
        try {
          const newLifetimeMembership =
            await createLifetimeMembershipPaymentIntent(customerId);
          setClientSecret(newLifetimeMembership.clientSecret);
          setPlanType(type);
          resolve();
        } catch (e) {
          setError(e);
        }
      } else if (type === "artistpack") {
        try {
          const newAPMembership = await createAPMembershipPaymentIntent(
            customerId
          );
          setClientSecret(newAPMembership.clientSecret);
          setPlanType(type);
          resolve();
        } catch (e) {
          setError(e);
        }
      }
    });
  };

  return (
    <SubscriptionsContext.Provider
      value={{
        subscriptionId,
        clientSecret,
        error,
        onSubscriptionRequest,
        planType,
      }}
    >
      {children}
    </SubscriptionsContext.Provider>
  );
};