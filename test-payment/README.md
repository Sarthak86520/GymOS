
# GymOS Razorpay Payment Test

This is a minimal frontend only for testing the backend Razorpay flow.

## Setup

```bash
npm install
cp .env.example .env
```

Put your Razorpay **TEST public key** in `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxx
```

Never put `RAZORPAY_KEY_SECRET` in this frontend.

## Test

1. Start your GymOS backend.
2. Make sure your backend has an active MembershipPlan.
3. Copy that plan's `_id`.
4. Run:

```bash
npm run dev
```

5. Open the Vite URL, normally `http://localhost:5173`.
6. Login using an existing member account.
7. Paste the MembershipPlan `_id`.
8. Click **Pay Now**.
9. Razorpay Checkout should open.
10. Complete the Razorpay TEST payment.
11. The page calls `/payments/verify`.
12. Backend should create the Membership and mark Payment as `success`.

The page uses `credentials: "include"` because the GymOS backend protects payment endpoints with JWT/cookies.

If login fails with a CORS/cookie error, fix the backend CORS configuration so `http://localhost:5173` is allowed with credentials.
