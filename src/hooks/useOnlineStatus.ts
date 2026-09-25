import { useEffect, useState, useCallback } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);
  const [lastOnlineTimestamp, setLastOnlineTimestamp] = useState<Date>(new Date());
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const effectiveOnline = simulatedOffline ? false : isOnline;

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineTimestamp(new Date());
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleSimulatedOffline = useCallback(() => {
    setSimulatedOffline((prev) => !prev);
  }, []);

  return {
    isOnline: effectiveOnline,
    rawIsOnline: isOnline,
    simulatedOffline,
    toggleSimulatedOffline,
    lastOnlineTimestamp,
    syncStatus,
    setSyncStatus,
  };
}
