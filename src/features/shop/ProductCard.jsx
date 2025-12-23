import React from 'react';
// Import the Hook to access cart functions
import { useCartContext } from '../../context/CartContext';
// Import shopping cart icon
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    // 1. Access the addItem function from global state
    const { addItem } = useCartContext();

    // Function to handle adding to cart
    const handleAddToCart = () => {
        // Pass the product with quantity (default 1) to the Context function
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1, // Default quantity upon first addition
        });
        
        // Console log message translated
        console.log(`Added ${product.name} to the cart.`);
    };

    return (
        <div className="product-card-container" style={{ direction: 'ltr', textAlign: 'left' }}>
            {/* 1. Image */}
            <div className="product-image-placeholder">
                <img src={product.imageUrl} alt={product.name} />
            </div>

            {/* 2. Details */}
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
            </div>
            
            {/* 3. Price and Action */}
            <div className="product-footer">
                <span className="product-price">
                    {/* Currency name translated */}
                    {product.price.toFixed(2)} EGP
                </span>
                
                <button 
                    onClick={handleAddToCart} 
                    className="add-to-cart-btn"
                >
                    <FaShoppingCart />
                    {/* Button text translated */}
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;