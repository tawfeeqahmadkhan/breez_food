"use client"
import React, { useState } from 'react';

export default function RestaurantInfo({ data }) {
  const [showHours, setShowHours] = useState(false);

  if (!data) return null;

  const { name, description, image, rate, gallery, location, call_info, working_hours, socials } = data;

  
  const [lat, lng] = location ? location.split(',') : [35.6892, 51.3890]; 
  

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const todayKey = days[new Date().getDay()];
  const todayHours = working_hours?.[todayKey];
  const isOpenNow = todayHours?.open && todayHours?.close ? true : false;

  const galleryImages = gallery ? Object.values(gallery) : [];

  return (
    <div className="bg-white shadow-lg rounded-b-[3rem] mb-10 overflow-hidden relative z-10">
      
      
      <div className="h-48 md:h-64 w-full bg-gray-200 relative">
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
         <img 
            src={galleryImages[0] || image} 
            alt="Cover" 
            className="w-full h-full object-cover"
         />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 relative -top-12 z-20">
        <div className="flex flex-col md:flex-row items-start gap-6">
          
          
          <div className="relative shrink-0">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl shadow-xl border-4 border-white bg-white overflow-hidden">
                <img src={image} alt={name} className="h-full w-full object-cover" />
            </div>
           
            <div className="absolute -bottom-3 -right-3 flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-md border border-gray-100">
                <span className="text-sm font-black text-gray-800">{rate}</span>
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
          </div>

     
          <div className="flex-1 w-full pt-12 md:pt-14 text-center md:text-right space-y-4">
            
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
               <div>
                    <h1 className="text-3xl font-black text-gray-800 mb-2">{name}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${isOpenNow ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isOpenNow ? 'باز است' : 'بسته است'}
                        </span>
                       
                        <div className="flex items-center gap-1 text-gray-500 text-xs bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            <span className="line-clamp-1">{call_info?.address}</span>
                        </div>
                    </div>
               </div>

               <div className="flex items-center gap-2">
                   {Object.entries(socials || {}).map(([platform, link]) => (
                       link && link !== '#' && (
                           <a key={platform} href={link} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors">
                             
                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                           </a>
                       )
                   ))}
               </div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-3xl mx-auto md:mx-0">
                {description}
            </p>

            {/* 4. Details Grid (Hours, Map, Gallery) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                
                {/* Contact & Hours Card */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-right">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                           <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                           ساعات کاری
                        </h3>
                        <button onClick={() => setShowHours(!showHours)} className="text-xs text-blue-500 font-bold hover:underline">
                            {showHours ? 'بستن' : 'مشاهده کامل'}
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {/* Today's Hours */}
                         <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                             <span className="font-medium text-gray-600">امروز ({days[new Date().getDay()]})</span>
                             <span className="text-gray-800" dir="ltr">{todayHours?.open || 'بسته'} - {todayHours?.close || ''}</span>
                         </div>
                         
                         {/* Expanded Hours */}
                         {showHours && (
                             <div className="animate-fade-in space-y-2 pt-2">
                                {Object.entries(working_hours || {}).map(([day, time]) => (
                                    day !== todayKey && (
                                        <div key={day} className="flex justify-between items-center text-xs text-gray-500">
                                            <span>{day}</span>
                                            <span dir="ltr">{time.open ? `${time.open} - ${time.close}` : 'بسته'}</span>
                                        </div>
                                    )
                                ))}
                             </div>
                         )}
                         
                         {/* Phone */}
                         <div className="flex items-center gap-3 pt-2">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-400">شماره تماس</span>
                                <a href={`tel:${call_info?.phone}`} className="font-bold text-gray-700 hover:text-blue-600 transition-colors" dir="ltr">{call_info?.phone}</a>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Map Location Card */}
                <div className="bg-gray-50 rounded-2xl p-2 border border-gray-100 h-48 md:h-auto overflow-hidden relative group">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight="0" 
                        marginWidth="0" 
                        title="map"
                        className="w-full h-full rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        src={`https://maps.google.com/maps?q=${lat},${lng}&hl=fa&z=14&output=embed`}
                    ></iframe>
                    <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-2 rounded-lg shadow-sm hover:bg-white transition-colors flex items-center gap-1"
                    >
                        <span>مسیریابی</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </a>
                </div>

                {/* Gallery Preview Card (Desktop) / Scroll (Mobile) */}
                <div className="hidden md:block bg-gray-50 rounded-2xl p-2 border border-gray-100">
                     <div className="grid grid-cols-2 gap-2 h-full">
                         {galleryImages.slice(0, 4).map((img, idx) => (
                             <div key={idx} className="relative rounded-lg overflow-hidden h-20 md:h-auto">
                                 <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"/>
                             </div>
                         ))}
                     </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}