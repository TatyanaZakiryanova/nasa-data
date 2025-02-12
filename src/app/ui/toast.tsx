interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  return (
    <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 transform">
      <div className="animate-toastIn rounded-md bg-customButton px-6 py-3 text-customTextColor shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default Toast;
