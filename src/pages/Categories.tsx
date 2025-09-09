import CategoryList from "../components/CategoryList";

function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          Explore by Category
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Find your next upgrade fast. Browse top tech categories—from smart
          home gear to the latest gadgets.
        </p>
      </div>
      <CategoryList />
    </div>
  );
}

export default Categories;
