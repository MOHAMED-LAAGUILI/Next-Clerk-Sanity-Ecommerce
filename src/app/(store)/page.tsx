import ProductView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/Groq_Queries/getAllCategories";
import { getAllProducts } from "@/sanity/lib/Groq_Queries/getAllProducts";
import BlackFridayBanner from './../../components/BlackFridayBanner';

export default async function Home() {
  const products = await getAllProducts(); // Destructure to get products from data
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Black Friday Banner Section */}
      <div className="bg-white shadow-md">
        <BlackFridayBanner />
      </div>

      {/* Categories and Product View */}
      <div className="container mx-auto px-4 py-6">
        {/* Product View Section */}
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  );
}