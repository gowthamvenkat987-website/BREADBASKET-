import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let bgColor = 'bg-[#2D1B16] text-[#FAF6F0] border border-[#C59B27]/40';
        let IconComponent = CheckCircle2;
        let iconColor = 'text-[#D4AF37]';

        if (toast.type === 'error') {
          bgColor = 'bg-[#991B1B] text-white border border-red-400/40';
          IconComponent = AlertCircle;
          iconColor = 'text-red-200';
        } else if (toast.type === 'info') {
          bgColor = 'bg-[#1E293B] text-white border border-blue-400/40';
          IconComponent = Info;
          iconColor = 'text-blue-300';
        } else if (toast.type === 'warning') {
          bgColor = 'bg-[#78350F] text-amber-50 border border-amber-400/40';
          IconComponent = AlertTriangle;
          iconColor = 'text-amber-300';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-up ${bgColor}`}
          >
            <div className="flex items-center gap-2.5">
              <IconComponent className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 opacity-70 hover:opacity-100" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
