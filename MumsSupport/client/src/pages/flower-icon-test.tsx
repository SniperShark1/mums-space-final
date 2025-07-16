import React from "react";
import { CustomIcon } from "@/components/custom-icon";

export default function FlowerIconTest() {
  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6">Flower Emotion Icon Test</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Regular Flower Icon</h2>
          <div className="flex flex-col items-center gap-4">
            <CustomIcon name="flower" size="lg" />
            <span className="text-sm">flower</span>
          </div>
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">New Flower Emotion Icon</h2>
          <div className="flex flex-col items-center gap-4">
            <CustomIcon name="flower-emotion" size="lg" />
            <span className="text-sm">flower-emotion</span>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <CustomIcon name="flower-emotion" size="sm" />
            <span className="text-sm mt-2">Small</span>
          </div>
          <div className="flex flex-col items-center">
            <CustomIcon name="flower-emotion" size="md" />
            <span className="text-sm mt-2">Medium</span>
          </div>
          <div className="flex flex-col items-center">
            <CustomIcon name="flower-emotion" size="lg" />
            <span className="text-sm mt-2">Large</span>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Different Colors</h2>
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <CustomIcon name="flower-emotion" size="lg" className="text-pink-500" />
            <span className="text-sm mt-2">Pink</span>
          </div>
          <div className="flex flex-col items-center">
            <CustomIcon name="flower-emotion" size="lg" className="text-blue-500" />
            <span className="text-sm mt-2">Blue</span>
          </div>
          <div className="flex flex-col items-center">
            <CustomIcon name="flower-emotion" size="lg" className="text-purple-500" />
            <span className="text-sm mt-2">Purple</span>
          </div>
          <div className="flex flex-col items-center">
            <CustomIcon name="flower-emotion" size="lg" className="text-green-500" />
            <span className="text-sm mt-2">Green</span>
          </div>
        </div>
      </div>
    </div>
  );
}