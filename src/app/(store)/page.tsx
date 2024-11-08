import ProductView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/Groq_Queries/getAllCategories";
import { getAllProducts } from "@/sanity/lib/Groq_Queries/getAllProducts";
import BlackFridayBanner from './../../components/BlackFridayBanner';
 
// caching data
  // by default next doesnt cache data
export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts(); // Destructure to get products from data
  const categories = await getAllCategories();

 
  return (
    <div className="min-h-screen">
      {/* Black Friday Banner Section */}
      <div className=" shadow-md m-4">
        <BlackFridayBanner />
      </div>

      {/* Categories and Product View */}
      <div className="px-4 py-6">
        {/* Product View Section */}
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  );
}