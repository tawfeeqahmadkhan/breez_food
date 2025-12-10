"use client"
import React, { useEffect, useState } from 'react'

export default function Navbar({menus, selectedManu, setSelectedMenu, setSelectedCategory, selectedCategory}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Initial setup
  useEffect(() => {
    if(menus && menus.length > 0 && !selectedManu) {
        setSelectedMenu(menus[0]?.id);
        setSelectedCategory(menus[0]?.categories[0]?.id)
    }
  }, [menus]);

  // Handle Main Menu Change (e.g., Food vs Drinks)
  const handleSelectMenu = (id) => {
    setSelectedMenu(id);
    let findmenu = menus?.find((i)=>i.id == id);
    // Scroll to top when changing menu
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(findmenu?.categories?.length > 0) {
        setSelectedCategory(findmenu.categories[0].id);
    }
    setIsOpen(false);
  };

  // Handle Category Click (Scroll to section)
  const handleCategoryClick = (categoryId) => {
      // 1. Manually set selected state (for instant visual feedback)
      setSelectedCategory(categoryId);
      
      // 2. Find the element
      const section = document.getElementById(`category-${categoryId}`);
      
      // 3. Scroll to it
      if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  return (
    <div className="w-full flex justify-center py-4 sm:py-6 px-2 sm:px-4 font-sans transition-all duration-300" dir="rtl">
      <div className="relative w-full">
        
        {/* Menu Dropdown Selector */}
        <div className="absolute -top-5 right-6 sm:right-12 z-20 flex flex-row gap-2">
            <div className="relative w-['8rem']" dir="ltr">
                <button
                    onClick={toggleDropdown}
                    className="bg-[#9A6F20] text-white flex items-center justify-between w-full gap-2 px-4 py-2 rounded-2xl shadow-md border-b-2 border-[#7a5616] hover:bg-[#8a611a] transition-colors"
                >
                    <div className="flex items-center gap-2">
                    {selectedManu ? (
                        <>
                        <img 
                            src={'https://api.breez.food/public/image/category/restaurant.png'} 
                            alt="icon" 
                            className="w-5 h-5 object-contain" 
                        />
                        <span className="font-bold text-sm">{menus?.find((i)=>i.id == selectedManu)?.name}</span>
                        </>
                    ) : (
                        <span>Select a menu</span>
                    )}
                    </div>
                
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <ul className="absolute z-10 w-full mt-2 bg-[#9A6F20] text-white rounded-2xl shadow-lg border border-[#7a5616] overflow-hidden">
                    {menus?.map((menu, index) => (
                        <li
                        key={index}
                        onClick={() => handleSelectMenu(menu.id)}
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#8a611a] transition-colors border-b last:border-none border-[#8a611a]"
                        >
                        {/* Safe image handling */}
                        {menu?.image && (
                            <img 
                                src={menu.image.replace('http://localhost:4000/','https://api.breez.food/public/')} 
                                alt={menu.name} 
                                className="w-5 h-5 object-contain"
                            />
                        )}
                        <span className="font-bold text-sm">{menu?.name}</span>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>

        {/* Category Horizontal Scroll (Chips) */}
        <div className={`relative bg-[#C59D5F] h-16 sm:h-20 rounded-full w-full shadow-xl flex items-center px-2 sm:px-6 overflow-x-auto whitespace-nowrap no-scrollbar`}>
          <div className="flex items-center gap-2 w-full justify-start pr-2">
            

            {menus?.find((i)=>i.id == selectedManu)?.categories?.map((ctg)=>(
              <button 
                key={ctg.id}
                className={`text-white border border-transparent hover:bg-black/10 ${selectedCategory == ctg.id ? 'bg-[#9A6F20] shadow-md border-[#8a611a] scale-105':''} rounded-full px-4 py-2 flex items-center gap-2 transition-all flex-shrink-0 cursor-pointer`}
                onClick={() => handleCategoryClick(ctg.id)} // Uses new scroll handler
              >
                {ctg?.image && (
                    <img
                        src={ctg.image} 
                        alt={ctg.name} 
                        className="w-5 h-5 object-contain"
                    />
                )}
               <span className="font-medium text-sm sm:text-base">{ctg.name}</span>
             </button>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  )
}