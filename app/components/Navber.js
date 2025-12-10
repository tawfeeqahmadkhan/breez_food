"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";

export default function Navbar({menus}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(menus?.[0] || null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (menu) => {
    setSelected(menu);
    setIsOpen(false);
  };
  return (
    <div className="w-full flex justify-center py-12 px-2 sm:px-4 font-sans" dir="rtl">
      <div className="relative w-full ">
        
        <div className="absolute -top-5 right-6 sm:right-12 z-20 flex flex-row gap-2">
       <div className="relative w-['8rem']" dir="ltr">
      <button
        onClick={toggleDropdown}
        className="bg-[#9A6F20] text-white flex items-center justify-between w-full gap-2 px-4 py-2 rounded-2xl shadow-md border-b-2 border-[#7a5616] hover:bg-[#8a611a] transition-colors"
      >
        <div className="flex items-center gap-2">
          {/* Show selected image and name, or a placeholder */}
          {selected ? (
            <>
              <img 
                src={'https://api.breez.food/public/image/category/restaurant.png'} 
                alt="icon" 
                className="w-5 h-5 object-contain" // Tailwind for width/height 20px
              />
              <span className="font-bold text-sm">{selected.name}</span>
            </>
          ) : (
            <span>Select a menu</span>
          )}
        </div>
        
        {/* Arrow Icon */}
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-['4rem'] mt-2 bg-[#9A6F20] text-white rounded-2xl shadow-lg border border-[#7a5616] overflow-hidden">
          {menus?.map((menu, index) => (
            <li
              key={index}
              onClick={() => handleSelect(menu)}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#8a611a] transition-colors border-b last:border-none border-[#8a611a]"
            >
              <img 
                src={menu?.image?.replace('http://localhost:4000/','https://api.breez.food/public/')} 
                alt={menu?.name} 
                className="w-5 h-5 object-contain"
              />
              <span className="font-bold text-sm">{menu?.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
        </div>

        <div className="relative bg-[#C59D5F] h-16 sm:h-20 rounded-full w-full shadow-xl flex items-center px-2 sm:px-6 overflow-x-auto whitespace-nowrap no-scrollbar">
          
          <div className="flex items-center gap-2 w-full justify-start pr-2">
            
            <div className="w-32 hidden sm:block flex-shrink-0"></div> 

            <button className="text-white hover:bg-black/10 rounded-full px-4 py-2 flex items-center gap-2 transition-all flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.74Z"/>
                <path d="m15 9-6 6"/>
                <path d="M9 9h.01"/>
                <path d="M15 15h.01"/>
              </svg>
              <span className="font-medium text-sm sm:text-base">با تخفیف</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}