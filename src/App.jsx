import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar'; // تأكد إن الاسم مطابق لملفك الجديد

// استدعاء الصفحات
import Home from './pages/Home';
import Diagnostics from './pages/Diagnostics';
import Shop from './pages/Shop';
import ServiceLocator from './pages/ServiceLocator';
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* النافبار ثابت فوق */}
      <AppNavbar />

      {/* المحتوى المتغير */}
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/locator" element={<ServiceLocator />} />
          <Route path="/" element={<Home />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;