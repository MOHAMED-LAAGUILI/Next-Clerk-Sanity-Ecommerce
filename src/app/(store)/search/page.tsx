import { searchProductByName } from "@/sanity/lib/Groq_Queries/getProductsBySearchName";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import Image from "next/image";

// Loading UI for when search results are being fetched


// No Results UI for when no products match the search query
const NoResults = () => (
  <div className="w-full text-center py-6">
    <span className="text-xl font-semibold text-gray-600">No results found. Try refining your search.</span>
  </div>
);

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const { query } = await searchParams;
  
  // Fetch products based on the search query
  const products = await searchProductByName(query);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for: <span className="text-blue-500">{query}</span>
      </h1>

      {products.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <div className="text-lg mb-4">
            <span>{products.length} product{products.length !== 1 ? "s" : ""} found.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className=" rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:shadow-xl relative"
              >
                <Link href={`/product/${product.slug?.current}`} passHref>
                  <p className="flex flex-col p-4">
                    {/* Product Image Section */}
                    <div className="relative">
                      {product.image?.asset && (
                        <Image
                          src={imageUrl(product.image).url()}
                          alt={product.name || "Product Image"}
                          className="object-cover w-full h-48"
                          width={"200"}
                          height={"200"}
                        />
                      )}
                    </div>

                    {/* Product Info Section */}
                    <div className="mt-3">
                      <h2 className="text-xl font-semibold ">
                        {product.name || "Unnamed Product"}
                      </h2>
                      <p className=" mt-1">{product.description}</p>
                      <p className="text-lg font-bold mt-2">
                        ${product.price}
                      </p>
                    </div>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
