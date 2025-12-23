import { useState, useEffect } from 'react';
import mockData from '../data/OBD_Mock_Data.json';

export const useVehicleScanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scanVehicle = async () => {
      try {
        // محاكاة الاتصال بالسيارة (تأخير 1.5 ثانية)
        await new Promise(resolve => setTimeout(resolve, 1500));
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to connect to ECU");
        setLoading(false);
      }
    };

    scanVehicle();
  }, []);

  return { data, loading, error };
};