function AboutUs() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 text-gray-800">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center text-gray-900">
        About Us
      </h1>
      <div className="space-y-5 md:space-y-6">
        <p className="text-lg md:text-xl leading-relaxed">
          Welcome to{" "}
          <strong className="text-[#d87d4a] font-semibold">SmartCart</strong>,
          your smart choice for smarter shopping!
        </p>
        <p className="text-lg md:text-xl leading-relaxed">
          At SmartCart, we're passionate about technology, convenience, and
          great deals. Whether you're looking for the latest gadgets, home
          electronics, or daily tech essentials, our curated platform helps you
          discover the right products—fast and hassle-free.
        </p>
        <ul className="list-disc list-inside space-y-2 md:space-y-3 text-lg md:text-xl pl-5 md:pl-6">
          <li className="leading-relaxed">
            Seamless browsing and checkout experience
          </li>
          <li className="leading-relaxed">
            Smart recommendations tailored to your preferences
          </li>
          <li className="leading-relaxed">
            A customer-first approach that values trust and satisfaction
          </li>
        </ul>
        <p className="text-lg md:text-xl leading-relaxed">
          SmartCart is designed with performance and simplicity in mind. We're
          continually improving to bring you the smartest way to shop online.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
