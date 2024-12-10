import React from 'react';

const page = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Subscription API Documentation</h1>

            {/* API Endpoints */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">API Endpoints</h2>
                <p>
                    <strong>POST /api/subscription</strong>: Handles subscription requests for users.
                    <em> This endpoint supports two plans:</em> <strong>Free</strong> and <strong>Platinum</strong>.
                </p>
                <p>
                    <strong>POST /api/subscription/stripe/success</strong>: Verifies successful payments
                    and updates the user's subscription status for Platinum plans.
                </p>
            </section>

            {/* Request Bodies */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Request Bodies</h2>

                {/* Free Plan */}
                <h3 className="font-semibold">1. Subscribing a User (Free Plan)</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {`{
  "plan": "Free",  // Required. The selected subscription plan.
  "email": "user@example.com",  // Required. User's email address.
  "userId": "unique-user-id"  // Required. User's unique identifier.
}`}
                </pre>

                {/* Platinum Plan */}
                <h3 className="font-semibold mt-4">2. Subscribing a User (Platinum Plan)</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {`{
  "plan": "Platinum",  // Required. The selected subscription plan.
  "email": "user@example.com",  // Required. User's email address.
  "userId": "unique-user-id"  // Required. User's unique identifier.
}`}
                </pre>
            </section>

            {/* Response Format */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Response Format</h2>

                {/* Free Plan Success Response */}
                <h3 className="font-semibold">1. Success Response (Free Plan)</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {`{
  "message": "Subscription activated successfully",
  "plan": "Free"
}`}
                </pre>

                {/* Platinum Plan Success Response */}
                <h3 className="font-semibold mt-4">2. Success Response (Platinum Plan)</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {`{
  "message": "Proceed to payment",
  "session": {
    "id": "cs_test_xxxxxxxxxxxxxx",
    "object": "checkout.session",
    "url": "https://checkout.stripe.com/c/pay/cs_test_xxxxxxxxxxxxxx"
  }
}`}
                </pre>

                {/* Payment Verification */}

                <h3 className="font-semibold mt-4">3. Payment Verification (Platinum Plan)</h3>
                <p>
                    <strong>POST /api/subscription/stripe/success</strong>: Verifies successful payments
                    and updates the user's subscription status for Platinum plans.
                </p>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {`{
  "session_id": "stripe-session-id"  // Required. The Stripe Checkout Session ID.
}`}
                </pre>

                {/* Payment Verification Success Response */}
                <h3 className="font-semibold mt-4">3. Payment Verification Success Response (Platinum Plan)</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {`{
  "session": {
    "id": "cs_test_xxxxxxxxxxxxxx",
    "payment_status": "paid",
    "status": "complete",
    "metadata": {
      "userId": "unique-user-id"
    }
  },
  "message": "Payment verified and subscription activated"
}`}
                </pre>

                {/* Error Response */}
                <h3 className="font-semibold mt-4">4. Error Response</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {`{
  "message": "Server error",
  "error": "Detailed error message"
}`}
                </pre>
            </section>

            {/* Notes for Frontend Developers */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Frontend Developer Notes</h2>
                <ul className="list-disc list-inside">
                    <li>
                        For Free Plan subscriptions, no additional action is required after the request.
                    </li>
                    <li>
                        For Platinum Plan subscriptions, use the <strong>url</strong> field in the response
                        to redirect users to the Stripe payment page.
                    </li>
                    <li>
                        Once payment is complete, pass the <strong>session_id</strong> to the <code>POST /api/subscription/stripe/success</code>
                        endpoint for verification.
                    </li>
                    <li>
                        Ensure all required fields in the request body are properly validated on the frontend before making API calls.
                    </li>
                    <li>
                        Handle error responses gracefully to improve the user experience.
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default page;
