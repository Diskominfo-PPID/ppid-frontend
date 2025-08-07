import { useState, useEffect, useCallback } from 'react';
import { RequestData, generateDummyRequests, simulateRealtimeUpdate, generateStatusData, generateMonthlyData, generateDailyData, generateCategoryData } from '@/lib/dummyData';

export const useRealtimeData = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const initialData = generateDummyRequests(30);
    setRequests(initialData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(current => {
        const updated = simulateRealtimeUpdate(current);
        if (updated.length !== current.length || updated[0]?.id !== current[0]?.id) {
          setLastUpdate(new Date());
        }
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    processing: requests.filter(r => r.status === 'processing').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  const chartData = {
    monthly: generateMonthlyData(),
    daily: generateDailyData(),
    category: generateCategoryData(),
    status: generateStatusData(requests)
  };

  const refreshData = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const newData = generateDummyRequests(30);
      setRequests(newData);
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  }, []);

  return {
    requests: requests.slice(0, 10),
    stats,
    chartData,
    isLoading,
    lastUpdate,
    refreshData
  };
};