import BrandList from "../components/BrandList";

function Brands() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          Top Tech & Audio Brands to Know
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover top tech and audio brands known for their innovative
          products, from smartphones to gaming gear and high-quality audio
          equipment, shaping the future of tech and entertainment.
        </p>
      </div>
      <BrandList />
    </div>
  );
}

export default Brands;
