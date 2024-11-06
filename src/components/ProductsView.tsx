"use client"
import { Category, Products } from "../../sanity.types";
import ProductGrid from './ProductsGrid';
import CategorySelector from "./CategorySelector";

interface ProductViewProps {
  products: Products[];
  categories: Category[]; 
}

const ProductView = ({ products, categories }: ProductViewProps) => {
  return (
    <div className="flex flex-col container  p-6 space-y-12">
      
    {/* Categories Section */}
   <section>
<CategorySelector categories={categories} />
    </section>  

      {/* Products Section */}
      <section>
        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default ProductView;
