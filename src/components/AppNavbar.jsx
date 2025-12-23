import { NavLink } from 'react-router-dom';

const AppNavbar = () => {
  const linkClass = ({ isActive }) => 
    isActive 
      ? "text-brand-accent font-bold border-b-2 border-brand-accent" // استخدام لون الـ Accent (الأزرق)
      : "text-gray-300 hover:text-white transition";

  return (
    // هنا استخدمنا brand-900 اللي هو الكحلي الغامق اللي في إعداداتك
    <nav className="bg-brand-900 p-4 shadow-lg border-b border-brand-800">
      <div className="container mx-auto flex justify-between items-center">
        
        <NavLink to="/" className="text-2xl font-bold text-white flex items-center gap-2">
           AutoCare <span className="text-brand-accent">Pro</span> 🔧
        </NavLink>

        <div className="flex gap-6 text-lg">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/diagnostics" className={linkClass}>Diagnostics</NavLink>
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/locator" className={linkClass}>Find Centers 📍</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;