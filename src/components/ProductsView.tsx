"use client";
import { Category, Products } from "../../sanity.types";
import ProductGrid from './ProductsGrid';
import CategorySelector from "./CategorySelector";

interface ProductViewProps {
  products: Products[];
  categories: Category[];
}

const ProductView = ({ products, categories }: ProductViewProps) => {
  return (
    <div className="flex flex-col container mx-auto px-4 py-6">
      
      {/* Categories Section */}
      <section className="w-full md:w-1/4 mb-8 md:mb-0 md:mr-8">
        <CategorySelector categories={categories} />
      </section>

      {/* Products Section */}
      <section className="w-full md:w-3/4">
        <ProductGrid products={products} />
      </section>

    </div>
  );
};

export default ProductView;