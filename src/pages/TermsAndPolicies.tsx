function TermsAndPolicies() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Policies</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">1. Terms of Use</h2>
          <p>
            By using SmartCart, you agree to our terms and conditions. Users
            must provide accurate information and follow local laws when
            shopping on our platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. Privacy Policy</h2>
          <p>
            Your privacy is important to us. We collect only the necessary data
            to enhance your experience and never sell your data to third
            parties.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. Shipping Policy</h2>
          <p>
            We offer standard and express shipping options. Delivery times vary
            by location. You’ll receive tracking info by email.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Return & Refund Policy</h2>
          <p>
            Returns are accepted within 14 days of delivery. Refunds are
            processed within 5–7 business days after we receive and inspect the
            returned item.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. Contact Us</h2>
          <p>
            For any questions, reach out at:{" "}
            <a href="mailto:support@smartcart.com" className="text-blue-600">
              support@smartcart.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default TermsAndPolicies;
