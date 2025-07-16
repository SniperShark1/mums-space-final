export default function SvgTest() {
  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">HTML Emotion Icons Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Excited Icon - Pure HTML */}
          <div className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-gray-50">
            <div 
              className="mb-4 p-4 bg-pink-500 rounded-full flex justify-center items-center" 
              style={{ width: '120px', height: '120px' }}
            >
              <div dangerouslySetInnerHTML={{ __html: `
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                >
                  <circle fill="#FFFFFF" cx="12" cy="12" r="10"/>
                  
                  <!-- Big smile with open mouth -->
                  <path d="M7,12 C7,12 9,17 12,17 C15,17 17,12 17,12" fill="#FFFFFF" />
                  <path d="M7,12 C7,12 9,17 12,17 C15,17 17,12 17,12" fill="none" stroke="#FFFFFF" stroke-width="0.5" />
                  
                  <!-- Interior of mouth -->
                  <path d="M8,13 C9,16 11,16.5 12,16.5 C13,16.5 15,16 16,13" fill="#FF3B3B" />
                  
                  <!-- Wide open eyes -->
                  <circle fill="#FFFFFF" cx="9" cy="9" r="1.8"/>
                  <circle fill="#FFFFFF" cx="15" cy="9" r="1.8"/>
                  <circle fill="#331800" cx="9" cy="9" r="0.9"/>
                  <circle fill="#331800" cx="15" cy="9" r="0.9"/>
                  
                  <!-- Eyebrows raised high in excitement -->
                  <path d="M7,6.5 C8,6 10,6 11,6.5" stroke="#000000" stroke-width="1.2" stroke-linecap="round" />
                  <path d="M13,6.5 C14,6 16,6 17,6.5" stroke="#000000" stroke-width="1.2" stroke-linecap="round" />
                  
                  <!-- Raised hands on sides (simplified) -->
                  <path d="M2,12 L5,8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M22,12 L19,8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M3,10 L5,7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M21,10 L19,7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              `}} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excited</h3>
            <p className="text-center text-gray-600">Using dangerouslySetInnerHTML</p>
          </div>
          
          {/* Scared Icon */}
          <div className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-gray-50">
            <div 
              className="mb-4 p-4 bg-purple-500 rounded-full flex justify-center items-center" 
              style={{ width: '120px', height: '120px' }}
            >
              <div dangerouslySetInnerHTML={{ __html: `
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                >
                  <circle fill="#FFFFFF" cx="12" cy="12" r="10"/>
                  
                  <!-- Screaming mouth -->
                  <path d="M9,16 C9,13.5 10.5,12 12,12 C13.5,12 15,13.5 15,16" fill="#442200" stroke="#FFFFFF" stroke-width="0.5" />
                  <path d="M9,16 C9,17 10.5,18 12,18 C13.5,18 15,17 15,16" fill="#442200" />
                  
                  <!-- Wide open eyes -->
                  <circle fill="#FFFFFF" cx="9" cy="9" r="2"/>
                  <circle fill="#FFFFFF" cx="15" cy="9" r="2"/>
                  <circle fill="#000000" cx="9" cy="9" r="1"/>
                  <circle fill="#000000" cx="15" cy="9" r="1"/>
                  
                  <!-- Eyebrows raised high in fear -->
                  <path d="M7,6.5 C8,6 9.5,6 10.5,6.5" stroke="#000000" stroke-width="1.2" stroke-linecap="round" transform="rotate(-10, 8.75, 6.25)" />
                  <path d="M13.5,6.5 C14.5,6 16,6 17,6.5" stroke="#000000" stroke-width="1.2" stroke-linecap="round" transform="rotate(10, 15.25, 6.25)" />
                  
                  <!-- Hands on cheeks -->
                  <path d="M6,12 C5,12 5,10 6,9 C7,8 8,9 8,10" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M18,12 C19,12 19,10 18,9 C17,8 16,9 16,10" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              `}} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Scared</h3>
            <p className="text-center text-gray-600">Using dangerouslySetInnerHTML</p>
          </div>
        </div>
        
        {/* Basic HTML elements */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Basic HTML Elements Test</h2>
          <div className="p-4 border rounded bg-gray-100">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-red-500 rounded-full"></div>
              <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
              <div className="w-16 h-16 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl">Text Test</h3>
              <p>This is a simple paragraph to test if basic HTML renders correctly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}