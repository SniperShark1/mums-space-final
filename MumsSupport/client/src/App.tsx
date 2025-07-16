// In App.tsx
import { Routes, Route } from 'react-router-dom';
import ProfileSetup from './pages/profile-setup';
import ProfileDetails from './pages/profile-details'; // Make sure this import is correct

function App() {
  return (
    <Routes>
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/profile-details" element={<ProfileDetails />} /> {/* This should match your URL */}
      {/* Other routes */}
    </Routes>
  );
}

export default App;