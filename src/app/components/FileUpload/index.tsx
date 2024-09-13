import React, { useEffect } from 'react';
import Button from '../Button';

interface FileUploadInterface {
  open: boolean;
  file: File;
  loading: boolean;
  handleOpen: () => void;
  handleFile: () => void;
  handleSubmit: () => void;
  extentionError?: string | null;
}

export default function FileUpload({
  open,
  file,
  loading,
  handleOpen,
  handleFile,
  handleSubmit,
  extentionError,
}: FileUploadInterface) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Upload File
          </h3>
          <button
            onClick={handleOpen}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {file && file[0] ? (
                  <span className="font-bold">({file[0].name})</span>
                ) : (
                  'CSV, XLS, XLSX files are allowed'
                )}
              </p>
              <span className="text-red-600 text-[14px]">
                {extentionError ? extentionError : ''}
              </span>
            </div>
            <input
              onChange={handleFile}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="justify-center flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <Button
            handleClick={handleSubmit}
            className={`h-14 w-32 gap-4 bg-[#3673D4] m-2 ${file === null ? 'opacity-60' : 'opacity-100'}`}
            text="Submit"
            type="button"
            loading={loading}
            disabled={file === null}
          />
          <Button
            handleClick={handleOpen}
            text="Close"
            type="button"
            className="h-14 w-32 gap-4 bg-[#3673D4]"
          />
        </div>
      </div>
    </div>
  );
}
