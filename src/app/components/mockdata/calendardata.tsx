import { ReactNode } from 'react';

interface StepInterface {
  icon: ReactNode;
  label: string;
}

const StepMockData: StepInterface[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
      >
        <path
          d="M10.395 8.25333C9.64333 8.25333 8.91611 8.12 8.23778 7.88C8.02389 7.8 7.78556 7.86 7.62056 8.04L6.66111 9.35333C4.93167 8.45333 3.31222 6.75333 2.45056 4.8L3.64222 3.69333C3.80722 3.50667 3.85611 3.24667 3.78889 3.01333C3.56278 2.27333 3.44667 1.48 3.44667 0.66C3.44667 0.3 3.17167 0 2.84167 0H0.727222C0.397222 0 0 0.16 0 0.66C0 6.85333 4.72389 12 10.395 12C10.8289 12 11 11.58 11 11.2133V8.91333C11 8.55333 10.725 8.25333 10.395 8.25333Z"
          fill="white"
        />
      </svg>
    ),
    label: 'Call',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
      >
        <path
          d="M10.395 8.25333C9.64333 8.25333 8.91611 8.12 8.23778 7.88C8.02389 7.8 7.78556 7.86 7.62056 8.04L6.66111 9.35333C4.93167 8.45333 3.31222 6.75333 2.45056 4.8L3.64222 3.69333C3.80722 3.50667 3.85611 3.24667 3.78889 3.01333C3.56278 2.27333 3.44667 1.48 3.44667 0.66C3.44667 0.3 3.17167 0 2.84167 0H0.727222C0.397222 0 0 0.16 0 0.66C0 6.85333 4.72389 12 10.395 12C10.8289 12 11 11.58 11 11.2133V8.91333C11 8.55333 10.725 8.25333 10.395 8.25333Z"
          fill="white"
        />
      </svg>
    ),
    label: 'Call',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
      >
        <path
          d="M10.395 8.25333C9.64333 8.25333 8.91611 8.12 8.23778 7.88C8.02389 7.8 7.78556 7.86 7.62056 8.04L6.66111 9.35333C4.93167 8.45333 3.31222 6.75333 2.45056 4.8L3.64222 3.69333C3.80722 3.50667 3.85611 3.24667 3.78889 3.01333C3.56278 2.27333 3.44667 1.48 3.44667 0.66C3.44667 0.3 3.17167 0 2.84167 0H0.727222C0.397222 0 0 0.16 0 0.66C0 6.85333 4.72389 12 10.395 12C10.8289 12 11 11.58 11 11.2133V8.91333C11 8.55333 10.725 8.25333 10.395 8.25333Z"
          fill="white"
        />
      </svg>
    ),
    label: 'Call',
  },
];

export { StepMockData };
