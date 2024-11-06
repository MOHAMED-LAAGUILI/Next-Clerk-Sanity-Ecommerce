
import ProductView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/Groq_Queries/getAllCategories";
import { getAllProducts } from "@/sanity/lib/Groq_Queries/getAllProducts";
import BlackFridayBanner from './../../components/BlackFridayBanner';

export default async function Home() {
  const products = await getAllProducts(); // Destructure to get products from data
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Black Friday Banner Section */}
      <div className="w-full p-4">
        <BlackFridayBanner />
      </div>

      {/* Categories and Product View */}
      <div className="container px-4">
       
    

        {/* Product View Section */}
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  );
}
