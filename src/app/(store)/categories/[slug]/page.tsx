import CategorySelector from "@/components/CategorySelector";
import { imageUrl } from "@/lib/imageUrl";
import { getProductsByCategory } from "@/sanity/lib/Groq_Queries/getProductsByCategory";
import Image from "next/image";
import Link from 'next/link';
import { Category } from "../../../../../sanity.types";



interface CategoriesPageProps {
    params: { slug: string };
}

const CategoriesPage = async ({ params, categories }: CategoriesPageProps) => {
    const { slug } = params;
    let products = []; // Make sure products is initialized as an empty array

    try {
        products = await getProductsByCategory(slug); // Fetch products by category slug
        console.log('Fetched products:', products); // Log the fetched products to check the structure
    } catch (error) {
        console.error('Error fetching products:', error);
        return (
            <div className="col-span-full text-center p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Something went wrong while fetching products.</h2>
                <p className="text-gray-500">Please try again later.</p>
            </div>
        );
    }

    // Safeguard: Ensure products is always an array
    if (!Array.isArray(products)) {
        console.error('Expected products to be an array, but got:', products);
        return (
            <div className="col-span-full text-center p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">No products available at this time.</h2>
                <p className="text-gray-500">Please check back later or explore other categories.</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="col-span-full text-center p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">No products available at this time.</h2>
                <p className="text-gray-500">Please check back later or explore other categories.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-4xl my-10 text-center font-extrabold mb-8 tracking-tight">{slug} Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {products.map((product) => {
                    const isOutOfStock = !product.stock || product.stock <= 0;
                    const imageUrlString = product.image?.asset ? imageUrl(product.image).url() : "";

                    return (
                        <div
                            key={product._id}
                            className={`my-10 bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:shadow-xl relative ${isOutOfStock ? "opacity-70" : ""}`}
                        >
                            <Link
                                href={`/product/${product.slug?.current}`}
                                passHref
                                aria-label={`View details for ${product.name || "Unnamed Product"}`}
                                className="flex flex-col p-4"
                            >
                                <div className="relative">
                                    {imageUrlString ? (
                                        <Image
                                            src={imageUrlString}
                                            alt={product.name || "Product Image"}
                                            width={300}
                                            height={300}
                                            className="object-cover h-48 w-full"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-500">No Image Available</span>
                                        </div>
                                    )}

                                    {isOutOfStock && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                            <span className="text-white font-bold text-xl">Out of Stock</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-3">
                                    <h2 className="text-lg font-semibold">{product.name || "Unnamed Product"}</h2>
                                    <p className="mt-1">{product.description || "No description available"}</p>
                                    <p className="mt-2 font-bold">${product.price}</p>
                                </div>

                                {isOutOfStock && (
                                    <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                                        Out of Stock
                                    </div>
                                )}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoriesPage;
