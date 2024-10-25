import { useState } from "react";
import axiosInstance from "../../axiosConfig/instance";

const Payment = ({ courseId, amount, course }) => {
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubscription = async () => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("Token not found");
  //     return; // Exit if no token is available
  //   }

  //   const paymentId = 2;
  //   setIsLoading(true);

  //   try {
  //     console.log(token, courseId, amount);

  //     const response = await axiosInstance.post(
  //       `courses/purchase-course`,
  //       {
  //         courseId,
  //         paymentId,
  //         amount,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     // console.log(response);

  //     const { invoiceId, invoiceKey } = response.data.payment;
  //     // console.log(invoiceId, invoiceKey);

  //     if (invoiceId && invoiceKey) {
  //       const redirectUrl = `https://app.fawaterk.com/invoice/${invoiceId}/${invoiceKey}`;
  //       window.location.href = redirectUrl;
  //     } else {
  //       console.error("Invoice ID or Key not found in the response");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error initiating payment:",
  //       error.response?.data || error.message
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubscription = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    setIsLoading(true);

    try {
      let requestBody;

      if (course.isFree) {
        requestBody = { courseId };
      } else {
        requestBody = {
          courseId,
          paymentId: 2,
          amount,
        };
      }

      // console.log(token, requestBody);

      const response = await axiosInstance.post(
        `courses/purchase-course`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { invoiceId, invoiceKey } = response.data.payment;

      if (invoiceId && invoiceKey) {
        const redirectUrl = `https://app.fawaterk.com/invoice/${invoiceId}/${invoiceKey}`;
        window.location.href = redirectUrl;
      } else {
        console.error("Invoice ID or Key not found in the response");
      }
    } catch (error) {
      console.error(
        "Error initiating payment:",
        error.response?.data.details.message.cartTotal || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscription}
      disabled={isLoading}
      className={`bg-gradient-to-r from-primaryBG to-GreidentColor2 py-2 md:py-3 w-full md:w-auto flex justify-center shadow-gray-400 text-white px-4 md:px-6 rounded-md text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-gray-800 hover:shadow-md`}
      style={{ fontFamily: "Lamsa-font-Bold" }}
    >
      {isLoading ? "Loading..." : "اشترك دلوقتي"}
    </button>
  );
};

export default Payment;
