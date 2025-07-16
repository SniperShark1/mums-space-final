import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function SvgConverter() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [svgCode, setSvgCode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    const fileType = file.type;
    if (!fileType.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImageUrl(img.src);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (imageUrl && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0);
        
        // Create simple SVG wrapper
        const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <image href="${canvas.toDataURL('image/png')}" height="100%" width="100%"/>
</svg>`;
        
        setSvgCode(svgTemplate);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const downloadSvg = () => {
    if (!svgCode) {
      alert('Please upload an image first!');
      return;
    }

    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mums-space-emoji.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySvgToClipboard = () => {
    if (!svgCode) {
      alert('Please upload an image first!');
      return;
    }

    navigator.clipboard.writeText(svgCode)
      .then(() => alert('SVG code copied to clipboard!'))
      .catch(err => console.error('Failed to copy SVG code: ', err));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4">🌸 Mum's Space Emoji Converter 🌸</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your image below to convert it to SVG format. This helps create custom emoji icons for the app.
          </p>
          <div className="mt-4 mb-2">
            <Button 
              className="bg-pink-600 hover:bg-pink-700 mr-2" 
              onClick={() => window.open("/svg-converter", "_blank")}
            >
              Open in New Tab
            </Button>
            <Button 
              variant="outline" 
              className="border-pink-600 text-pink-600 hover:bg-pink-50"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Mum's Space Emoji Converter",
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href)
                    .then(() => alert("Link copied to clipboard!"))
                    .catch(() => alert("Failed to copy link"));
                }
              }}
            >
              Share Link
            </Button>
          </div>
        </div>

        <Card className="p-6 shadow-md mb-8 bg-white">
          <div className="flex flex-col items-center">
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              className="mb-4 bg-pink-600 hover:bg-pink-700"
            >
              Choose Image
            </Button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={handleImageUpload} 
            />
            
            {imageUrl && (
              <div className="mt-4 text-center">
                <p className="mb-2 font-medium">Preview:</p>
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="max-w-full mx-auto mb-4" 
                  style={{ maxHeight: '250px' }} 
                />
                
                <div className="flex gap-3 mt-4 justify-center">
                  <Button 
                    onClick={downloadSvg}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Download SVG
                  </Button>
                  <Button 
                    onClick={copySvgToClipboard}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Copy SVG Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {svgCode && (
          <Card className="p-6 shadow-md bg-gray-50">
            <h2 className="text-xl font-bold mb-2">SVG Code:</h2>
            <div className="bg-gray-800 text-white p-4 rounded-md overflow-auto max-h-64">
              <pre className="text-xs">{svgCode}</pre>
            </div>
          </Card>
        )}

        {/* Pre-made Emoji Examples */}
        <Card className="p-6 shadow-md mb-8 bg-white">
          <h2 className="text-xl font-bold mb-4">Example Emoji SVGs</h2>
          <p className="text-gray-600 mb-6">
            Here are some pre-made emoji SVGs you can download and use directly:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Happy", emoji: "😀", color: "bg-yellow-400" },
              { name: "Sad", emoji: "😢", color: "bg-blue-400" },
              { name: "Excited", emoji: "🤩", color: "bg-pink-400" },
              { name: "Frustrated", emoji: "😤", color: "bg-red-400" },
              { name: "Tired", emoji: "😴", color: "bg-purple-400" },
              { name: "Relieved", emoji: "😌", color: "bg-green-400" },
              { name: "Loved", emoji: "🥰", color: "bg-red-400" },
              { name: "Scared", emoji: "😱", color: "bg-indigo-400" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full ${item.color} mx-auto mb-2 flex items-center justify-center`}>
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="text-xs mt-1"
                  onClick={() => {
                    // Generate basic SVG
                    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#FFFFFF" stroke="#000000" stroke-width="1"/>
  <text x="50" y="50" font-size="60" text-anchor="middle" dominant-baseline="central">${item.emoji}</text>
</svg>`;
                    
                    // Create download
                    const blob = new Blob([svgData], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${item.name.toLowerCase()}-emoji.svg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download {item.name}
                </Button>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Note: This is a simple SVG wrapper. For advanced vector tracing, we would need 
            to implement more sophisticated algorithms or connect to external services.
          </p>
        </div>
      </div>
      
      {/* Hidden canvas used for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}