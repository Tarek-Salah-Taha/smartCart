import BrandList from "../components/BrandList";

function Brands() {
  return (
    <div className="container mx-auto p-4 mt-4 mb-10 px-25">
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 pl-2 md:pl-10 text-gray-800 leading-tight ">
        Top Tech & Audio Brands to Know
      </h1>
      <p className="text-gray-600 mb-4 pl-2 sm:pl-4 md:pl-10 text-xl sm:text-2xl md:text-2xl lg:text-2xl">
        Discover top tech and audio brands known for their innovative products,
        from smartphones to gaming gear and high-quality audio equipment,
        shaping the future of tech and entertainment.
      </p>
      <BrandList />
    </div>
  );
}

export default Brands;
