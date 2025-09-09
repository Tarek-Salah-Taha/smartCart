function FAQs() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 text-gray-800">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10 text-center text-gray-900">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6 md:space-y-8">
        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg md:text-xl mb-3 text-gray-900">
            What is SmartCart?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            SmartCart is an online platform for discovering and purchasing
            top-quality tech and electronics products at great prices.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg md:text-xl mb-3 text-gray-900">
            Do I need an account to place an order?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            No, you can shop as a guest! However, creating an account gives you
            access to order tracking, favorites, and a faster checkout
            experience.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg md:text-xl mb-3 text-gray-900">
            How do I track my order?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Once your order is placed, you'll receive an email with tracking
            info. You can also view order status under your account dashboard.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg md:text-xl mb-3 text-gray-900">
            What is your return policy?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We offer a 14-day return window from the date of delivery. Items
            must be unused and in their original packaging.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg md:text-xl mb-3 text-gray-900">
            I have an issue with my order. What should I do?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Contact our support team at{" "}
            <a
              href="mailto:support@smartcart.com"
              className="text-[#d87d4a] hover:underline font-medium"
            >
              support@smartcart.com
            </a>
            . We're here to help!
          </p>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
