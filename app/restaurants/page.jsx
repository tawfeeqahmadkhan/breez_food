"use client"

import React, { useState, useEffect } from 'react';
import useSWR from 'swr'; 
import Navbar from '../components/Navber';

const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function RestaurantMenu() {
  const [selectedCategory,setSelectedCategory]  =useState('');
  const [selectedMenu,setSelectedMenu]  =useState('');
const { data, error, isLoading:loading } = useSWR('/api', fetcher);

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
  const allProducts = data.menus?.flatMap(menu => 
    menu.categories?.flatMap(cat => cat.products || []) || []
  ) || [];

  const { name, description, image, rate, call_info, working_hours } = data;
  const isOpen = working_hours?.Fr?.open ? true : false; 

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans" dir="rtl">
      <Navbar menus={data?.menus || []} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedManu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
      <div className="bg-white shadow-sm pb-6 pt-4 rounded-b-[2.5rem] mb-8">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            
        
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl shadow-md border-2 border-white">
              <img 
                src={image} 
                alt={name} 
                className="h-full w-full object-cover" 
              />
            </div>

           
            <div className="flex-1 text-center md:text-right space-y-2">
              <div className="flex flex-col md:flex-row items-center md:justify-between gap-2">
                <h1 className="text-2xl font-black text-gray-800">{name}</h1>
                <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-sm font-bold text-green-700">{rate}</span>
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
              </div>

              <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                {description}
              </p>

           
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-600 mt-3">
                 <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>{call_info?.address}</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <span dir="ltr">{call_info?.phone}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mb-6 text-right text-xl font-bold text-gray-800 border-r-4 border-orange-400 pr-3">
          جدیدترین ها
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((product) => {
            const discountPercent = calculateDiscount(product.regular_price, product.discounted_price);
            const hasDiscount = discountPercent > 0;

            return (
              <div 
                key={product.id} 
                className="group relative flex h-[190px] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-100"
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
          })}
        </div>
      </div>
    </div>
  );
}