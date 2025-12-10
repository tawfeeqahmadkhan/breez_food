"use client"
import React, { useState } from 'react';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const formatPrice = (price) => Math.floor(Number(price) / 1000).toLocaleString();
  const totalPrice = Number(product.discounted_price || product.regular_price) * quantity;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm transition-all" onClick={onClose}>
      <div 
        className="relative w-full max-w-md bg-white rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >

        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-gray-800">{product.name}</h3>
          <div className="relative h-40 w-40 rounded-xl overflow-hidden" >
             <img src={product.image} className="h-full w-full object-cover" alt={product.name} />
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 min-h-[3rem]">
            {product.description || "توضیحات خاصی ثبت نشده است."}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mb-8 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
           <span className="text-gray-500 text-sm px-2">تعداد:</span>
           <div className="flex items-center gap-4">
              <button onClick={handleIncrement} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold">+</button>
              <span className="font-bold text-xl min-w-[1.5rem] text-center">{quantity}</span>
              <button onClick={handleDecrement} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold">-</button>
           </div>
        </div>

        {/* Footer Actions */}
        <button 
            onClick={() => {
                onAddToCart(product, quantity);
                onClose();
            }}
            className="w-full bg-[#00C070] text-white font-bold py-4 rounded-xl flex items-center justify-between px-6 hover:bg-[#00a05d] transition-colors"
        >
            <span>افزودن به سبد خرید</span>
            <div className="flex flex-col items-end leading-tight">
                <span className="text-sm opacity-80">جمع کل</span>
                <span>{formatPrice(totalPrice)} تومان</span>
            </div>
        </button>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  );
}