import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  return createPortal(
    <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 transform">
      <div
        className={`${isFadingOut ? 'animate-toastOut' : 'animate-toastIn'} rounded-md bg-customButton px-6 py-3 text-center text-white shadow-lg`}
      >
        {message}
      </div>
    </div>,
    document.body,
  );
};

export default Toast;
