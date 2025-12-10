"use client"

import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr'; 
import Navbar from '../components/Navber'; 
import ProductModal from '../components/ProductModal'; 
import RestaurantInfo from '../components/RestaurantInfo';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function RestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  
 
  const [cart, setCart] = useState([]);

  const { data, error, isLoading: loading } = useSWR('/api', fetcher);

  
  const currentMenu = data?.menus?.find((m) => m.id == selectedMenu);
  

  const menuCategories = currentMenu?.categories || [];


  const observer = useRef(null);

  useEffect(() => {
    if (loading || !menuCategories.length) return;

  
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
       
          const categoryId = entry.target.getAttribute('id').replace('category-', '');
          setSelectedCategory(Number(categoryId));
        }
      });
    }, {
      rootMargin: '-150px 0px -50% 0px',
      threshold: 0
    });

    menuCategories.forEach(cat => {
      const el = document.getElementById(`category-${cat.id}`);
      if (el) observer.current.observe(el);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [selectedMenu, menuCategories, loading]);


  const handleProductClick = (product) => {
      setActiveProduct(product);
      setIsModalOpen(true);
  };

  const addToCart = (product, quantity) => {
      console.log(`Added ${quantity} of ${product.name} to cart`);
      setCart([...cart, { ...product, qty: quantity }]);
     
  };

  const formatPrice = (price) => {
    return Math.floor(Number(price) / 1000).toLocaleString();
  };

  const calculateDiscount = (regular, discounted) => {
    const reg = Number(regular);
    const disc = Number(discounted);
    if (!reg || !disc || disc >= reg) return 0;
    return Math.round(((reg - disc) / reg) * 100);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500"></div>
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center">خطا در دریافت اطلاعات</div>;

  const { name, description, image, rate, call_info } = data;

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans relative" dir="rtl">
      
      {/* Sticky Navbar */}
      <div className='sticky top-2 w-full z-[999]'>
        <Navbar 
            menus={data?.menus || []} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            selectedManu={selectedMenu} 
            setSelectedMenu={setSelectedMenu}
        />
      </div>
      
      {/* Restaurant Header Info */}
      <RestaurantInfo data={data}/>

   
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {menuCategories.map((category) => (
             
            <div key={category.id} id={`category-${category.id}`} className="mb-12 scroll-mt-48"> 
                
              
                <h2 className="mb-6 text-right text-xl font-bold text-gray-800 border-r-4 border-orange-400 pr-3 flex items-center gap-2">
                   {category.image && <img src={category.image} alt="" className="w-6 h-6 object-contain"/>}
                   {category.name}
                </h2>

               
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {category.products && category.products.length > 0 ? (
                        category.products.map((product) => {
                            const discountPercent = calculateDiscount(product.regular_price, product.discounted_price);
                            const hasDiscount = discountPercent > 0;

                            return (
                            <div 
                                key={product.id} 
                                onClick={() => handleProductClick(product)}
                                className="group relative flex h-[190px] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-100 cursor-pointer"
                            >
                                <div className="flex h-full w-full gap-3">
                                <div className="flex flex-1 flex-col pt-1">
                                    <h3 className="mb-2 text-lg font-black text-gray-800 line-clamp-1">
                                    {product.name}
                                    </h3>
                                    {product.emoji && (
                                    <div className="mb-2 inline-flex w-fit items-center rounded-lg bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-500 border border-gray-100">
                                        <span>{product.emoji}</span>
                                        <span className="mx-1.5 h-3 w-[1px] bg-gray-300"></span>
                                        <span>محتویات</span>
                                    </div>
                                    )}

                                    <p className="text-[11px] leading-5 text-gray-400 line-clamp-2 ml-1">
                                    {product.description || "توضیحات خاصی ثبت نشده است."}
                                    </p>
                                </div>
                                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                                    <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    />
                                </div>
                                </div>
                                <div className="absolute bottom-4 left-4 flex flex-col items-end">
                                {hasDiscount && (
                                    <div className="flex items-center gap-2 mb-[-2px]">
                                        <span className="text-xs text-gray-300 line-through decoration-gray-300">
                                        {formatPrice(product.regular_price)}
                                        </span>
                                        <div className="absolute -left-1 -top-8 rotate-[-12deg] rounded-full bg-[#e65555] px-2 py-[2px] text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                                        {discountPercent}%
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-end gap-1">
                                    <span className="text-xl font-black text-gray-800 leading-none tracking-tight">
                                    {formatPrice(product.discounted_price)}
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 mb-0.5">هزار تومان</span>
                                </div>
                                </div>
                            </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-400 text-sm col-span-full text-center py-4">محصولی در این دسته بندی موجود نیست.</p>
                    )}
                </div>
            </div>
        ))}
        
      </div>

      {/* Product Modal */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={activeProduct}
        onAddToCart={addToCart}
      />

    </div>
  );
}