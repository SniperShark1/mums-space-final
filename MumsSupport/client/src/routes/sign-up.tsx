import { SignUp } from '@clerk/react-router'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <span className="text-pink-soft text-3xl mr-2">🌸</span>
            <h1 className="text-3xl font-quicksand font-bold text-pink-600">Mum's Space</h1>
          </div>
          <p className="text-gray-600 font-quicksand">Create your account</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <SignUp routing="path" path="/sign-up" />
        </div>
      </div>
    </div>
  )
}