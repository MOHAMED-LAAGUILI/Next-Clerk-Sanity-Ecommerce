import React from 'react';
import { Products, Category} from '../../sanity.types';


interface ProductViewProps{
    products: Products[];
    categories: Category[];
}

const ProductView = ({products, categories}:ProductViewProps) => {
    return (
        <div className={"flex flex-col "}>
        {/* Categories */}
            <div className={"w-full "}>
                <h1>Categories</h1>

            </div>


        {/* Products */}
            <div>
                <div>
                    <h1>Products</h1>
                    <ul>
                     
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductView;
