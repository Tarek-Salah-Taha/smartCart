function TermsAndPolicies() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 text-gray-800">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10 text-center text-gray-900">
        Terms & Policies
      </h1>

      <div className="space-y-6 md:space-y-8">
        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border-l-4 border-[#d87d4a]">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
            1. Terms of Use
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By using SmartCart, you agree to our terms and conditions. Users
            must provide accurate information and follow local laws when
            shopping on our platform.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border-l-4 border-[#d87d4a]">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
            2. Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your privacy is important to us. We collect only the necessary data
            to enhance your experience and never sell your data to third
            parties.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border-l-4 border-[#d87d4a]">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
            3. Shipping Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We offer standard and express shipping options. Delivery times vary
            by location. You'll receive tracking info by email.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border-l-4 border-[#d87d4a]">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
            4. Return & Refund Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Returns are accepted within 14 days of delivery. Refunds are
            processed within 5–7 business days after we receive and inspect the
            returned item.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border-l-4 border-[#d87d4a]">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
            5. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            For any questions, reach out at:{" "}
            <a
              href="mailto:support@smartcart.com"
              className="text-[#d87d4a] hover:underline font-medium"
            >
              support@smartcart.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default TermsAndPolicies;
