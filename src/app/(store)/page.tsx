import ProductView from "@/components/productView";
import { getAllCategories } from "@/sanity/lib/Groq_Queries/getAllCategories";
import { getAllProducts } from "@/sanity/lib/Groq_Queries/getAllProducts";


export default async function Home() {

  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <>
<div>
  <ProductView products={products} categories={categories} />
</div>
    </>
  );
}
