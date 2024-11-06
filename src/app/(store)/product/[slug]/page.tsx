import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import GetSingleProductBySlug from './../../../../sanity/lib/Groq_Queries/getSingleProductBySlug';
import AddToBasketButton from "@/components/AddToBasketButton";

async function SingleProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await GetSingleProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-3xl">Product not found .</span>
      </div>
    );
  }

  const isOutOfStock = !product.stock || product.stock <= 0;
  const imageUrlString = product.image?.asset ? imageUrl(product.image).url() : "";

  return (
    <div className="p-6 max-w-screen-xl mx-auto flex flex-col lg:flex-row">

      {/* Product Image Section */}
      <div className="relative w-full lg:w-1/2 h-96">
        {imageUrlString ? (
          <Image
            src={imageUrlString}
            alt={product.name || "Product Image"}
            layout="fill"
            objectFit="cover"
            className="w-full h-full rounded-lg shadow-md"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 rounded-lg">
            No Image Available
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-100 bg-opacity-50 rounded-lg">
            <span className=" font-bold text-3xl">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 lg:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{product.name || "Unnamed Product"}</h1>
          <p className="mt-2 prose">{product.description || "No description available."}</p>
          <p className="mt-2 text-xl font-bold">${product.price}</p>
        </div>

       <div className="mt-6">
        <AddToBasketButton product={product} disabled={isOutOfStock}/>
       </div>
       
      </div>

    </div>
  );
};

export default SingleProductPage;