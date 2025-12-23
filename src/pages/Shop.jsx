import { useState } from 'react';

// حولنا الأسعار لأرقام عشان نعرف نجمعها
const products = [
  { id: 1, name: "Premium Motor Oil", price: 450, category: "Maintenance", icon: "🛢️" },
  { id: 2, name: "Car Battery (70Ah)", price: 2200, category: "Electrical", icon: "🔋" },
  { id: 3, name: "Air Filter", price: 150, category: "Filters", icon: "🌬️" },
  { id: 4, name: "Brake Pads (Front)", price: 850, category: "Brakes", icon: "🛑" },
  { id: 5, name: "Spark Plugs (Set)", price: 600, category: "Engine", icon: "⚡" },
  { id: 6, name: "Wiper Blades", price: 200, category: "Accessories", icon: "🌧️" },
];

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // حالة فتح/غلق السلة

  // إضافة منتج
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // حذف منتج (بالاندكس عشان لو ضاف نفس المنتج مرتين يمسح واحد بس)
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // حساب الإجمالي
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // إتمام الشراء
  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Order Placed Successfully! Total: ${totalPrice} EGP\nWe will contact you soon.`);
    setCart([]); // تفريغ السلة
    setIsCartOpen(false);
  };

  return (
    <div className="p-8 relative">
      
      {/* Header & Cart Button */}
      <div className="flex justify-between items-center mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-3xl font-bold text-brand-900">AutoCare Shop 🛒</h2>
          <p className="text-gray-500 text-sm">Genuine parts for your car.</p>
        </div>
        
        {/* زرار فتح السلة */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative bg-brand-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span>View Cart 🛍️</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col items-center group">
            <div className="text-6xl mb-4 bg-gray-50 p-6 rounded-full group-hover:scale-110 transition">{product.icon}</div>
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <span className="text-sm text-gray-500 mb-2">{product.category}</span>
            <div className="text-2xl font-bold text-brand-accent mb-4">{product.price} EGP</div>
            
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-brand-900 text-white py-2 rounded-lg hover:bg-brand-800 transition active:scale-95"
            >
              Add to Cart ➕
            </button>
          </div>
        ))}
      </div>

      {/* ================= CART MODAL (Popup) ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col animate-slide-in-right">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-brand-900">Your Cart ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-red-500 text-2xl">
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <p className="text-4xl mb-2">🛒</p>
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.price} EGP</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-bold px-2 py-1 rounded bg-red-50 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer (Total & Checkout) */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4 text-xl font-bold text-gray-800">
                <span>Total:</span>
                <span className="text-brand-accent">{totalPrice} EGP</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-3 rounded-lg font-bold text-white transition ${
                  cart.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Checkout Now ✅
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;