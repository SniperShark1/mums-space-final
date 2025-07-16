import React from 'react';

export function EmotionIconTest() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Custom Emotion Icons</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Excited Icon */}
          <div className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-gray-50">
            <div className="mb-4 p-4 bg-pink-500 rounded-full" style={{ width: 120, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                className="text-white"
                aria-hidden="true"
              >
                <circle fill="#FFFFFF" cx="12" cy="12" r="10"/>
                
                {/* Big smile with open mouth */}
                <path d="M7,12 C7,12 9,17 12,17 C15,17 17,12 17,12" fill="#FFFFFF" />
                <path d="M7,12 C7,12 9,17 12,17 C15,17 17,12 17,12" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
                
                {/* Interior of mouth */}
                <path d="M8,13 C9,16 11,16.5 12,16.5 C13,16.5 15,16 16,13" fill="#FF3B3B" />
                
                {/* Wide open eyes */}
                <circle fill="#FFFFFF" cx="9" cy="9" r="1.8"/>
                <circle fill="#FFFFFF" cx="15" cy="9" r="1.8"/>
                <circle fill="#331800" cx="9" cy="9" r="0.9"/>
                <circle fill="#331800" cx="15" cy="9" r="0.9"/>
                
                {/* Eyebrows raised high in excitement */}
                <path d="M7,6.5 C8,6 10,6 11,6.5" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M13,6.5 C14,6 16,6 17,6.5" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
                
                {/* Raised hands on sides (simplified) */}
                <path d="M2,12 L5,8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22,12 L19,8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3,10 L5,7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M21,10 L19,7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Excited</h3>
            <p className="text-center text-gray-600">Inline SVG for excited emotion</p>
          </div>
          
          {/* Sad Icon with Tears */}
          <div className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-gray-50">
            <div className="mb-4 p-4 bg-blue-500 rounded-full" style={{ width: 120, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                className="text-white"
                aria-hidden="true"
              >
                <circle fill="#FFFFFF" cx="12" cy="12" r="10"/>

                {/* Closed eyes with curved brows */}
                <path d="M8,9 L10,9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14,9 L16,9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                
                {/* Eyebrows */}
                <path d="M7,7 C8,6.5 9,6.5 10,7" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-20, 8.5, 6.75)" />
                <path d="M14,7 C15,6.5 16,6.5 17,7" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" transform="rotate(20, 15.5, 6.75)" />
                
                {/* Crying mouth */}
                <path d="M9,16 C10,14.5 11,14 12,14 C13,14 14,14.5 15,16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" transform="rotate(180, 12, 15)"/>
                <path d="M10,16.5 C10.5,15.5 11.5,15 12,15 C12.5,15 13.5,15.5 14,16.5" fill="#442200" />
                
                {/* Tears */}
                <path d="M8.5,10 L8.5,14" stroke="#40C0FF" strokeWidth="2" strokeLinecap="round" />
                <path d="M15.5,10 L15.5,14" stroke="#40C0FF" strokeWidth="2" strokeLinecap="round" />
                <circle fill="#40C0FF" cx="8.5" cy="14" r="1" />
                <circle fill="#40C0FF" cx="15.5" cy="14" r="1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sad (with tears)</h3>
            <p className="text-center text-gray-600">Sad face with blue tears</p>
          </div>
          
          {/* Frustrated Icon */}
          <div className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-gray-50">
            <div className="mb-4 p-4 bg-red-500 rounded-full" style={{ width: 120, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                className="text-white"
                aria-hidden="true"
              >
                <circle fill="#FFFFFF" cx="12" cy="12" r="10"/>
                
                {/* Frowning mouth */}
                <path d="M9,16 C9.5,15 10.5,14.5 12,14.5 C13.5,14.5 14.5,15 15,16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" transform="rotate(180, 12, 15.25)"/>
                
                {/* Closed eyes with furrow */}
                <path d="M8,9 L10,9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14,9 L16,9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                
                {/* Furrowed brow */}
                <path d="M7,7 C8,5.8 10,5.8 11,7" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" transform="rotate(180, 9, 6.4)" />
                <path d="M13,7 C14,5.8 16,5.8 17,7" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" transform="rotate(180, 15, 6.4)" />
                <path d="M11,6 L13,6" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
                
                {/* Hands on temples */}
                <path d="M3,11 L5,9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M21,11 L19,9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4,12 L6,10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M20,12 L18,10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Frustrated</h3>
            <p className="text-center text-gray-600">Frustrated face with furrowed brow</p>
          </div>
          
          {/* Scared Icon */}
          <div className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-gray-50">
            <div className="mb-4 p-4 bg-purple-500 rounded-full" style={{ width: 120, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                className="text-white"
                aria-hidden="true"
              >
                <circle fill="#FFFFFF" cx="12" cy="12" r="10"/>
                
                {/* Screaming mouth */}
                <path d="M9,16 C9,13.5 10.5,12 12,12 C13.5,12 15,13.5 15,16" fill="#442200" stroke="#FFFFFF" strokeWidth="0.5" />
                <path d="M9,16 C9,17 10.5,18 12,18 C13.5,18 15,17 15,16" fill="#442200" />
                
                {/* Wide open eyes */}
                <circle fill="#FFFFFF" cx="9" cy="9" r="2"/>
                <circle fill="#FFFFFF" cx="15" cy="9" r="2"/>
                <circle fill="#000000" cx="9" cy="9" r="1"/>
                <circle fill="#000000" cx="15" cy="9" r="1"/>
                
                {/* Eyebrows raised high in fear */}
                <path d="M7,6.5 C8,6 9.5,6 10.5,6.5" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-10, 8.75, 6.25)" />
                <path d="M13.5,6.5 C14.5,6 16,6 17,6.5" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" transform="rotate(10, 15.25, 6.25)" />
                
                {/* Hands on cheeks */}
                <path d="M6,12 C5,12 5,10 6,9 C7,8 8,9 8,10" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18,12 C19,12 19,10 18,9 C17,8 16,9 16,10" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5,11 C4,11 4,9 5,8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M19,11 C20,11 20,9 19,8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Scared</h3>
            <p className="text-center text-gray-600">Scared face with hands on cheeks</p>
          </div>
        </div>
      </div>
    </div>
  );
}