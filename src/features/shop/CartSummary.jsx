import React from 'react';
import { useCartContext } from '../../context/CartContext';
import { FaMoneyBillWave } from 'react-icons/fa';

// افتراض تكلفة شحن ثابتة لأغراض العرض في الواجهة الأمامية
const MOCK_SHIPPING_COST = 150.00; 

const CartSummary = ({ showShipping = true, isFinal = false }) => {
    // 1. الوصول إلى الحالة العامة للسلة
    const { items, totalAmount, totalQuantity } = useCartContext();

    // حساب الإجمالي النهائي (مع أو بدون تكلفة الشحن حسب الـ Prop)
    const finalTotal = totalAmount + (showShipping ? MOCK_SHIPPING_COST : 0);

    return (
        <div className="cart-summary-card">
            
            {/* 1. رأس الملخص */}
            <h3 className="summary-title">
                <FaMoneyBillWave size={20} style={{ marginLeft: '10px' }} />
                ملخص الطلب ({totalQuantity} قطعة)
            </h3>
            
            {/* قائمة المنتجات القابلة للتمرير */}
            <div className="summary-section items-list-scroll">
                {items.map(item => (
                    <div key={item.id} className="summary-item-row">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">x{item.quantity}</span>
                        <span className="item-price-sum">{ (item.price * item.quantity).toFixed(2) }</span>
                    </div>
                ))}
            </div>

            <hr className="summary-separator" />

            {/* 2. تفاصيل التكاليف */}
            <div className="summary-section pricing-breakdown">
                <p>الإجمالي الفرعي:</p>
                <p className="price-value">{totalAmount.toFixed(2)} جنيه</p>
                
                {showShipping && (
                    <p>تكلفة الشحن:</p>
                )}
                {showShipping && (
                    <p className="price-value">{MOCK_SHIPPING_COST.toFixed(2)} جنيه</p>
                )}
            </div>

            <hr className="summary-separator" />

            {/* 3. الإجمالي النهائي (شكل مميز في الخطوة الأخيرة) */}
            <div className={`summary-section final-total ${isFinal ? 'is-final-total' : ''}`}>
                <h4>الإجمالي النهائي:</h4>
                <h4 className="price-value">{finalTotal.toFixed(2)} جنيه</h4>
            </div>
            
        </div>
    );
};

export default CartSummary;