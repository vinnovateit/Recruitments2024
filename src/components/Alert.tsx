// components/CustomAlert.tsx
import React, { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface AlertProps {
  message: string;
  onClose: () => void;
  variant?: 'error' | 'success';
  duration?: number;
}

const Alert = ({ 
  message, 
  onClose, 
  variant = 'error',
  duration = 3000 
}: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = variant === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white rounded-lg shadow-lg p-4 min-w-[300px] animate-slideIn`}>
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p className="flex-grow text-sm">{message}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;