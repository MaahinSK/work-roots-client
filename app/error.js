'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Something went wrong!</h2>
          <p className="mt-2 text-gray-600">
            We apologize for the inconvenience. Please try again.
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}