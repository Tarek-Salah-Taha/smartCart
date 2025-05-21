import CategoryInfoCard from "./CategoryInfoCard";
import categoryData from "../data/categoryData";

function CategoryList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {categoryData.map((category) => (
        <CategoryInfoCard
          key={category.title}
          title={category.title}
          description={category.description}
          link={`/categories/${category.link}`}
          image={category.image}
        />
      ))}
    </div>
  );
}

export default CategoryList;
