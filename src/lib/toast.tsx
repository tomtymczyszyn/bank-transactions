import { toast as toastify, ToastOptions } from 'react-toastify';

const defaultOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

function success(content: string, options: ToastOptions = {}) {
  toastify.success(content, { ...defaultOptions, ...options });
}

function error(content: string, options: ToastOptions = {}) {
  toastify.error(content, { ...defaultOptions, ...options });
}

const toast = {
  success,
  error,
};

export default toast;
