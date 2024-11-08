import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMyOrders } from "@/sanity/lib/Groq_Queries/getMyOrders";
import { FaCheckCircle, FaClock } from "react-icons/fa"; // Importing React Icons
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";

const OrdersPageServer = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
    return null;
  }

  try {
    const orders = await getMyOrders(userId);

    if (orders.length === 0) {
      return (
        <div className="text-center mt-8">
          <p className="text-xl font-semibold text-gray-700">
            You have no orders yet.
          </p>
          <p className="text-gray-500">
            Check back later after placing an order.
          </p>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-8">Your Orders</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => {
            // Ensure totalPrice and discountAmount are not null before using them
            const totalPrice = order?.totalPrice ?? 0; // Default to 0 if null
            const discountAmount = order?.discount ?? 0; // Default to 0 if null
            const discountPercentage =
              discountAmount && totalPrice
                ? (discountAmount / totalPrice) * 100
                : 0;
            const originalPrice = totalPrice + discountAmount;

            // Ensure orderDate is not null or invalid
            const orderDate = order?.orderDate
              ? new Date(order.orderDate).toLocaleDateString()
              : "N/A";

            return (
              <div
                key={order._id}
                className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-green-800">
                      Order #{order.orderNumber}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-sm font-medium ${
                          order.orderStatus === "pending"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                      {order.orderStatus === "pending" ? (
                        <FaClock className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <FaCheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm">
                    Ordered on: {orderDate}
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">Original Price</span>
                      <span className="text-gray-800">
                        {originalPrice > 0 ? originalPrice.toFixed(2) : "N/A"}{" "}
                        {order?.currency?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">Discount Amount</span>
                      <span className="text-gray-800">
                        {discountAmount.toFixed(2)}{" "}
                        {order?.currency?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">Discount %</span>
                      <span className="text-gray-800">
                        {discountPercentage > 0
                          ? discountPercentage.toFixed(0) 
                          : "no discount applyed"}
                       
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">Total Price</span>
                      <span className="text-gray-800">
                        {totalPrice.toFixed(2)} {order?.currency?.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Display products */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Orderd Items:
                    </h3>
                    <ul className="list-disc pl-5 space-y-3">
                    {order?.products?.map((product) => {
  // Check if product image exists
  const productImageUrl =
    product?.product?.image ? imageUrl(product.product.image).url() : "/fallback-image.jpg"; // Fallback if image is not available
  const productName = product.product?.name || "Unnamed Product";

  return (
    <li key={product._key} className="flex items-center space-x-4">
      <Image
        src={productImageUrl}
        alt={productName}
        className="w-16 h-16 object-cover rounded-md"
        width={64}
        height={64}
      />
      <div className="text-sm text-gray-600">
        <span className="block font-semibold">{productName}</span>
        <span className="block">
          x{product.quantity} - ${(
            (product?.price || 0) * (product?.quantity || 1)
          ).toFixed(2)} {order?.currency?.toUpperCase()}
        </span>
      </div>
    </li>
  );
})}

                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">
          Error loading your orders. Please try again later.
        </p>
      </div>
    );
  }
};

export default OrdersPageServer;
