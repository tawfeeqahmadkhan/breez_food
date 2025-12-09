"use client"
import React, { useEffect } from 'react'
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center py-12 px-2 sm:px-4 font-sans" dir="rtl">
      <div className="relative w-full ">
        
        <div className="absolute -top-5 right-6 sm:right-12 z-20">
          <button className="bg-[#9A6F20] text-white flex items-center gap-2 px-4 py-2 rounded-2xl shadow-md border-b-2 border-[#7a5616] hover:bg-[#8a611a] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
              <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
              <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
              <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
              <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
              <path d="M6 18a4 4 0 0 1-1.97-3.284"/>
              <path d="M17.97 14.716A4 4 0 0 1 16 18"/>
            </svg>
            <span className="font-bold text-sm">منوی هوشمند</span>
          </button>
        </div>

        <div className="relative bg-[#C59D5F] h-16 sm:h-20 rounded-full w-full shadow-xl flex items-center px-2 sm:px-6 overflow-x-auto whitespace-nowrap no-scrollbar">
          
          <div className="flex items-center gap-2 w-full justify-start pr-2">
            
            <div className="w-32 hidden sm:block flex-shrink-0"></div> 

            <Link href='/restaurants' className="bg-white/25 hover:bg-white/35 transition-all text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 backdrop-blur-sm flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                <path d="M7 2v20"/>
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
              </svg>
              <span className="font-bold text-sm sm:text-base">رستوران ها</span>
            </Link>

            <button className="text-white hover:bg-black/10 rounded-full px-4 py-2 flex items-center gap-2 transition-all flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.74Z"/>
                <path d="m15 9-6 6"/>
                <path d="M9 9h.01"/>
                <path d="M15 15h.01"/>
              </svg>
              <span className="font-medium text-sm sm:text-base">با تخفیف</span>
            </button>

            <button className="text-white hover:bg-black/10 rounded-full px-4 py-2 flex items-center gap-2 transition-all flex-shrink-0">
               <div className="bg-transparent border border-white/70 rounded px-1 py-0.5 text-[10px] font-bold text-white">
                جدید
              </div>
              <span className="font-medium text-sm sm:text-base">جدیدترین</span>
            </button>

             <button className="text-white hover:bg-black/10 rounded-full px-4 py-2 flex items-center gap-2 transition-all flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                <path d="m3.3 7 8.7 5 8.7-5"/>
                <path d="M12 22v-9"/>
              </svg>
              <span className="font-medium text-sm sm:text-base">مشاهده کنید 3D </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}