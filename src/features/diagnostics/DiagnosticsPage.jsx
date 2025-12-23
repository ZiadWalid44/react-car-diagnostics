import React from 'react';
import { useVehicleScanner } from '../../hooks/useVehicleScanner';
import { AlertTriangle, CheckCircle, Thermometer, Zap, Activity } from 'lucide-react';

const DiagnosticsPage = () => {
  const { data, loading, error } = useVehicleScanner();

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
      <div className="w-16 h-16 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
      <p className="text-brand-800 font-semibold animate-pulse">Connecting to Vehicle ECU...</p>
    </div>
  );

  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-brand-900 mb-2">Vehicle Health Report</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">VIN: {data.vehicle_info.vin}</span>
        </div>
      </header>

      {/* Live Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Engine Temp" value={`${data.live_data.temp}°C`} icon={<Thermometer />} color="text-orange-500" />
        <MetricCard title="Battery" value={`${data.live_data.battery}V`} icon={<Zap />} color="text-yellow-500" />
        <MetricCard title="RPM" value={data.live_data.rpm} icon={<Activity />} color="text-blue-500" />
        <MetricCard title="Status" value={data.vehicle_info.status} icon={<AlertTriangle />} color="text-red-500" />
      </div>

      {/* Fault Codes Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-brand-900 text-white p-4">
          <h2 className="font-bold flex items-center gap-2">
            <AlertTriangle size={20} /> Active Diagnostic Trouble Codes (DTC)
          </h2>
        </div>
        <div className="p-0">
          {data.fault_codes.map((fault, index) => (
            <div key={index} className="p-4 border-b last:border-0 hover:bg-slate-50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-red-100 text-red-700 font-mono font-bold px-3 py-1 rounded border border-red-200">
                    {fault.code}
                  </span>
                  <span className="font-semibold text-brand-900">{fault.system} System</span>
                </div>
                <p className="text-gray-600 text-sm">{fault.description}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100 uppercase">
                {fault.severity} Severity
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// مكون صغير للكروت
const MetricCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
    <div className={`p-3 rounded-full bg-slate-50 ${color}`}>{icon}</div>
  </div>
);

export default DiagnosticsPage;