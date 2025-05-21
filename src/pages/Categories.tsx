import CategoryList from "../components/CategoryList";

function Categories() {
  return (
    <div className="container mx-auto p-4 mt-4 mb-10 px-25">
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 pl-2 md:pl-10 text-gray-800 leading-tight ">
        Explore by Category
      </h1>
      <p className="text-gray-600 mb-4 pl-2 sm:pl-4 md:pl-10 text-xl sm:text-2xl md:text-2xl lg:text-2xl">
        Find your next upgrade fast. Browse top tech categories—from smart home
        gear to the latest gadgets.
      </p>
      <CategoryList />
    </div>
  );
}

export default Categories;
