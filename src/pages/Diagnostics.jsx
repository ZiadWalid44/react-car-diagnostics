import { useState } from 'react';

const Diagnostics = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    issue: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // التعديل هنا: البحث عن طريق جوجل
      // الصيغة: نوع العربية + الموديل + السنة + المشكلة + اسم الموقع
      const searchQuery = `${formData.make} ${formData.model} ${formData.year} ${formData.issue} CarCareKiosk`;
      
      // رابط جوجل المباشر
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

      setResult({
        diagnosis: `Based on your input for the ${formData.year} ${formData.make} ${formData.model}, the issue "${formData.issue}" might need immediate attention.`,
        severity: "Medium",
        videoLink: googleSearchUrl // بنستخدم رابط جوجل هنا
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-brand-900 mb-2">AI Car Diagnostics 🩺</h2>
        <p className="text-gray-600">Describe your problem, and let AI guide you with video solutions.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Make</label>
              <input 
                type="text" name="make" placeholder="e.g. Chevrolet" required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input 
                  type="text" name="model" placeholder="e.g. Cruze" required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input 
                  type="number" name="year" placeholder="2016" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Describe the Issue</label>
              <textarea 
                name="issue" rows="3" placeholder="e.g. Change oil light on..." required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-accent outline-none"
                onChange={handleChange}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-accent hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>Run AI Diagnosis 🚀</>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col justify-center items-center text-center">
          {!result ? (
            <div className="text-gray-400">
              <span className="text-6xl block mb-4">🤖</span>
              <p>AI is waiting for your input...</p>
            </div>
          ) : (
            <div className="w-full animate-fade-in">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                Analysis Complete
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">Potential Issue Detected:</h3>
              <p className="text-gray-600 mb-6 bg-white p-4 rounded-lg shadow-sm">
                {result.diagnosis}
              </p>

              {/* زرار جوجل الجديد */}
              <div className="bg-brand-900 text-white p-6 rounded-xl shadow-xl">
                <h4 className="font-bold text-lg mb-2">Fix it yourself! 🛠️</h4>
                <p className="text-gray-300 text-sm mb-4">Find the exact video tutorial on Google for your car.</p>
                
                <a 
                  href={result.videoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 flex justify-center items-center gap-2"
                >
                  {/* Google Icon SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  Search Video on Google
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Diagnostics;