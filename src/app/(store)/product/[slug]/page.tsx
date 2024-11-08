import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import GetSingleProductBySlug from './../../../../sanity/lib/Groq_Queries/getSingleProductBySlug';
import AddToBasketButton from "@/components/AddToBasketButton";
import { notFound } from "next/navigation";


export const dynamic = "force-static";
export const revalidate = 60;


async function SingleProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await GetSingleProductBySlug(slug);

  if (!product) {
    return notFound();
   }

  const isOutOfStock = !product.stock || product.stock <= 0;
  const imageUrlString = product.image?.asset ? imageUrl(product.image).url() : "";

 
  return (
    <div className="p-6 max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-8">

  {/* Product Image Section */}
  <div className="relative w-full lg:w-1/2 h-96 rounded-lg overflow-hidden">
    {imageUrlString ? (
      <Image
        src={imageUrlString}
        alt={product.name || "Product Image"}
        layout="fill"
        objectFit="cover"
        className="w-full h-full rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        loading="lazy"
      />
    ) : (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 rounded-lg">
        No Image Available
      </div>
    )}

    {/* Out of Stock Overlay */}
    {isOutOfStock && (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white bg-opacity-50 rounded-lg">
        <span className="font-bold text-3xl">Out of Stock</span>
        <div className="absolute top-2 right-2 text-xs font-semibold px-2 py-1 bg-red-500 text-white rounded">
                Out of Stock
              </div>
      </div>
      
    )}
  </div>

  {/* Product Info */}
  <div className="p-4 lg:w-1/2 flex flex-col justify-between space-y-6">
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">{product.name || "Unnamed Product"}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{product.description || "No description available."}</p>
      <p className="mt-4 text-xl font-bold text-blue-600">${product.price}</p>
    </div>

    {/* Add to Basket Button */}
    <div className="mt-6">
      <AddToBasketButton product={product} disabled={isOutOfStock} />
    </div>

  </div>

</div>

  );
};

export default SingleProductPage;