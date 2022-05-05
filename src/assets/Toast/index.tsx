import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.scss';

export function CustomToast({ message }: { message: string }) {
  return (
    <div
      className="Toastify__content"
      dangerouslySetInnerHTML={{ __html: message }}
      data-testid="ToastContent"
    />
  );
}

// TODO: tweak the timing and possibly animation
export const notify = (
  message: string | { message?: string; detail?: string }[],
  type: 'positive' | 'negative'
) => {
  const options = {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
  };
  let m = message;

  // Arrays are only passed in for errors
  if (Array.isArray(m)) {
    if (m[0]?.message || m[0]?.detail) {
      const t = m.map(({ message, detail }) => message || detail).join('\n');
      m = t;
    } else {
      m = 'An error occurred.';
    }
  }
  const htmlObject = document.createElement('div');
  htmlObject.innerHTML = m;
  switch (type) {
    case 'positive':
      return toast.success(
        <div className="Toastify__container">
          <CustomToast message={m} />
        </div>,
        options
      );
    case 'negative':
      return toast.error(
        <div className="Toastify__container">
          <CustomToast message={m || 'An error occurred.'} />
        </div>,
        options
      );
  }
};

export const PositiveToast = (message: string | { message?: string; detail?: string }[]) => {
  notify(message, 'positive');
};
// TODO: fix this typing
export const NegativeToast = (message: string | { message?: string; detail?: string }[] | any) => {
  notify(message, 'negative');
};
