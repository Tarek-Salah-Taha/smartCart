function FAQs() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="space-y-6">
        <div>
          <h2 className="font-semibold">What is SmartCart?</h2>
          <p>
            SmartCart is an online platform for discovering and purchasing
            top-quality tech and electronics products at great prices.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            Do I need an account to place an order?
          </h2>
          <p>
            No, you can shop as a guest! However, creating an account gives you
            access to order tracking, favorites, and a faster checkout
            experience.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">How do I track my order?</h2>
          <p>
            Once your order is placed, you’ll receive an email with tracking
            info. You can also view order status under your account dashboard.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">What is your return policy?</h2>
          <p>
            We offer a 14-day return window from the date of delivery. Items
            must be unused and in their original packaging.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            I have an issue with my order. What should I do?
          </h2>
          <p>
            Contact our support team at{" "}
            <a href="mailto:support@smartcart.com" className="text-blue-600">
              support@smartcart.com
            </a>
            . We’re here to help!
          </p>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
