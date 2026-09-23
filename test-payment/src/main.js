
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

document.querySelector("#root").innerHTML = `
  <main style="
    max-width:760px;
    margin:40px auto;
    padding:24px;
    font-family:Arial,sans-serif;
    color:#111;
  ">
    <h1>GymOS — Razorpay Payment Test</h1>
    <p>
      This is a minimal test page. It does not use your existing Login/Signup UI.
    </p>

    <section style="border:1px solid #ddd;border-radius:12px;padding:20px;margin-top:20px;">
      <h2>1. Login</h2>
      <form id="loginForm">
        <input id="email" type="email" placeholder="Member email"
          required style="width:100%;padding:12px;margin:6px 0;box-sizing:border-box;" />
        <input id="password" type="password" placeholder="Password"
          required style="width:100%;padding:12px;margin:6px 0;box-sizing:border-box;" />
        <button type="submit" style="padding:12px 18px;cursor:pointer;">
          Login
        </button>
      </form>
        <p id="loginStatus"></p>
    </section>

    <section style="border:1px solid #ddd;border-radius:12px;padding:20px;margin-top:20px;">
      <h2>2. Membership Plan</h2>
      <p>Enter the MongoDB <b>MembershipPlan _id</b> you used successfully with Postman.</p>
      <input id="planId" placeholder="Membership Plan ID"
        style="width:100%;padding:12px;box-sizing:border-box;" />
      <button id="payButton" style="margin-top:12px;padding:12px 18px;cursor:pointer;">
        Pay Now
      </button>
    </section>

    <section style="border:1px solid #ddd;border-radius:12px;padding:20px;margin-top:20px;">
      <h2>3. Result</h2>
      <pre id="result" style="
        background:#f5f5f5;
        padding:15px;
        white-space:pre-wrap;
        overflow:auto;
      ">Waiting...</pre>
    </section>
  </main>
`;

const $ = (id) => document.getElementById(id);

function showResult(value) {
  $("result").textContent =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

$("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  $("loginStatus").textContent = "Logging in...";

  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email: $("email").value.trim(),
        password: $("password").value
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Login failed");
    }

    $("loginStatus").textContent =
      "✅ Login successful. You can test payment now.";

    showResult({
      step: "login",
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    $("loginStatus").textContent = `❌ ${error.message}`;
    showResult(error.message);
  }
});

$("payButton").addEventListener("click", async () => {
  try {
    if (!RAZORPAY_KEY_ID) {
      throw new Error(
        "VITE_RAZORPAY_KEY_ID missing. Put your Razorpay TEST public key in .env."
      );
    }

    if (!window.Razorpay) {
      throw new Error("Razorpay Checkout script did not load.");
    }

    const planId = $("planId").value.trim();

    if (!planId) {
      throw new Error("Enter Membership Plan ID.");
    }

    showResult("Creating Razorpay order...");

    // Step 1: backend creates Razorpay order
    const orderResponse = await fetch(
      `${API_BASE_URL}/payments/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ planId })
      }
    );

    const orderResult = await orderResponse.json();

    if (!orderResponse.ok || !orderResult.success) {
      throw new Error(
        orderResult.message || "create-order failed"
      );
    }

    const order = orderResult.data;

    showResult({
      step: "create-order",
      success: true,
      order
    });

    // Step 2: open Razorpay Checkout
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "GymOS",
      description: "Gym Membership Test Payment",
      order_id: order.orderId,

      handler: async function (razorpayResponse) {
        try {
          showResult({
            step: "checkout-success",
            message: "Payment completed. Verifying...",
            razorpayResponse
          });

          // Step 3: verify on backend
          const verifyResponse = await fetch(
            `${API_BASE_URL}/payments/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "include",
              body: JSON.stringify({
                razorpay_order_id:
                  razorpayResponse.razorpay_order_id,
                razorpay_payment_id:
                  razorpayResponse.razorpay_payment_id,
                razorpay_signature:
                  razorpayResponse.razorpay_signature
              })
            }
          );

          const verifyResult = await verifyResponse.json();

          if (!verifyResponse.ok || !verifyResult.success) {
            throw new Error(
              verifyResult.message || "Payment verification failed"
            );
          }

          showResult({
            step: "payment-complete",
            success: true,
            message: "Payment verified and membership created.",
            data: verifyResult.data
          });
        } catch (error) {
          showResult({
            step: "verification-error",
            success: false,
            message: error.message
          });
        }
      },

      modal: {
        ondismiss: function () {
          showResult("Razorpay Checkout closed.");
        }
      },

      theme: {
        color: "#16a34a"
      }
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      showResult({
        step: "payment-failed",
        success: false,
        error: response.error
      });
    });

    razorpay.open();
  } catch (error) {
    showResult({
      success: false,
      message: error.message
    });
  }
});
