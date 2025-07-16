import { EmotionIconTest } from '@/components/EmotionIconTest';

export default function TestPage() {
  return (
    <div>
      {/* Show both versions for comparison */}
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Direct SVG Icons</h1>
          
          {/* Use our new component that has in-line SVGs */}
          <EmotionIconTest />
        </div>
      </div>
    </div>
  );
}