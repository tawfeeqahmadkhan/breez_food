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
      <RestaurantInfo data={data} />


      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {menuCategories.map((category) => (

          <div key={category.id} id={`category-${category.id}`} className="mb-12 scroll-mt-48">


            <h2 className="mb-6 text-right text-xl font-bold text-gray-800 border-r-4 border-orange-400 pr-3 flex items-center gap-2">
              {category.image && <img src={category.image} alt="" className="w-6 h-6 object-contain" />}
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
                      
                      className="group relative h-[420px] w-full max-w-[360px] cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
                    >
                   
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent top-[35%]" />
                      <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-3">

                        <div className="flex flex-col items-end gap-2" dir='ltr'>

                          <h3 className="text-xl font-bold font-black text-gray-900 tracking-tight text-right">
                            {product.name}
                          </h3>

                         
                          <div className="mb-2 flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 backdrop-blur-sm" dir='ltr'>
                            <div className="text-green-600">
                              <span>{product?.emoji}</span>
                            </div>
                            <div className="cursor-pointer text-gray-400 hover:text-gray-600" dir='ltr'>
                              <span className="text-sm font-bold text-gray-700">| آلرژن‌ها</span>
                              
                            </div>
                            
                            
                            
                          </div>

                         
                          <p className="line-clamp-3 text-right text-xs font-medium leading-6 text-gray-500" dir="rtl">
                            {product.description || "ترکیبی از برگ‌های تازه، سیب قرمز، گردو برشته و پنیر بز، با سس بالزامیک و عسل"}
                          </p>
                        </div>

                      
                        <div className=" flex w-full items-end justify-between">

                         
                          <div className="flex flex-col items-start leading-none">
                        
                            {hasDiscount && (
                              <span className="mb-1 text-xs text-gray-400 line-through decoration-gray-400">
                                {formatPrice(product.regular_price)}
                              </span>
                            )}

                            <div className="flex items-end gap-1">
                              <span className="text-2xl font-black text-gray-900">
                               
                                {formatPrice(product.discounted_price)}
                              </span>
                              <span className="text-xs font-bold text-gray-500 ">هزار تومان</span>
                            </div>
                            
                          </div>
                         
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