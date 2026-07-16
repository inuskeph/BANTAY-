'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'bg-bantay-safe/90 border-bantay-safe',
    error: 'bg-bantay-danger/90 border-bantay-danger',
    warning: 'bg-bantay-warning/90 border-bantay-warning',
    info: 'bg-bantay-primary/90 border-bantay-primary',
  };

  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };

  return (
    <div className={`fixed top-4 right-4 z-[9999] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl shadow-2xl text-white ${colors[type]}`}>
        <span className="text-lg">{icons[type]}</span>
        <p className="text-sm font-medium">{message}</p>
        <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} className="ml-2 text-white/70 hover:text-white">✕</button>
      </div>
    </div>
  );
}

// Toast manager hook
export function useToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([]);
  let counter = 0;

  const show = (message: string, type: ToastType = 'info') => {
    const id = Date.now() + counter++;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const remove = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => remove(toast.id)} />
      ))}
    </div>
  );

  return { show, ToastContainer };
}
