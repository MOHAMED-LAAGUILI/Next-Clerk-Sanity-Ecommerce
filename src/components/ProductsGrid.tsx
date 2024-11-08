// src/components/ProductsGrid.tsx

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/imageUrl"; // Ensure correct import
import { Products } from "../../sanity.types"; // Ensure correct import

const ProductGrid = ({ products }: { products: Products[] }) => {
  if (products.length === 0) {
    return (
      <div className="col-span-full text-center p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">No products available at this time.</h2>
        <p className="text-gray-500">Please check back later or explore other categories.</p>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
  <h1 className="text-4xl text-center font-extrabold mb-8 tracking-tight">
    Products
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    <AnimatePresence>
      {products.map((product) => {
        const isOutOfStock = !product.stock || product.stock <= 0;
        const imageUrlString = product.image?.asset ? imageUrl(product.image).url() : "";

        return (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`relative border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-200 transform hover:shadow-xl hover:scale-105 ${isOutOfStock ? "opacity-70" : ""}`}
          >
            <Link href={`/product/${product.slug?.current}`} passHref className="flex flex-col p-4">
              {/* Product Image Section */}
              <div className="relative">
                {imageUrlString && (
                  <Image
                    src={imageUrlString}
                    alt={product.name || "Product Image"}
                    width={300}
                    height={300}
                    className="object-cover w-full h-48 sm:h-64 lg:h-72"
                    loading="lazy"
                  />
                )}

                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="font-bold text-xl">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="mt-3">
                <h1 className="text-lg font-semibold ">{product.name || "Unnamed Product"}</h1>
                <p className="mt-1text-sm">
                {product.description && product.description.length > 100 
          ? `${product.description.substring(0, 100)}...` 
          : product.description || "No description available."}
                </p>
                <p className="mt-2 text-xl font-bold">${product.price}</p>
              </div>
            </Link>

            {/* Out of Stock Badge */}
            {isOutOfStock && (
              <div className="absolute top-2 right-2 text-xs font-semibold px-2 py-1 bg-red-500 text-white rounded">
                Out of Stock
              </div>
            )}
          </motion.div>
        );
      })}
    </AnimatePresence>
  </div>
</div>

  );
};

// **Make sure this is the default export**
export default ProductGrid;