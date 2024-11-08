import { getProductsByCategory } from "@/sanity/lib/Groq_Queries/getProductsByCategory";
import { getAllCategories } from "@/sanity/lib/Groq_Queries/getAllCategories";
import ProductView from './../../../../components/ProductsView';

const CategoriesPage = async ({params}:{ params : Promise<{ slug: string }>}) => {
  try {
    // Destructure the slug directly from params
    const { slug } = await params;
    
    // Fetch products and categories based on the slug
    const products = await getProductsByCategory(slug);
    const categories = await getAllCategories();

    // Capitalize the slug for display in the header (e.g., "summer-clothing" -> "Summer Clothing")
    const formattedSlug = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <div>
        <h1 className="text-4xl font-extrabold my-6 text-center">
          {formattedSlug} Collection
        </h1>

        {/* Passing products and categories as props to ProductView */}
        <ProductView products={products} categories={categories} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="text-center p-6">
        <h2 className="text-lg font-semibold">Something went wrong while fetching data.</h2>
        <p className="text-gray-500">Please try again later.</p>
      </div>
    );
  }
};

export default CategoriesPage;
