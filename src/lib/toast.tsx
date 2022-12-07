import { toast as toastify } from 'react-toastify';

function success(content: string, options = {}) {
  toastify.success(content, options);
}

function error(content: string, options = {}) {
  toastify.error(content, options);
}

const toast = {
  success,
  error,
};

export default toast;
