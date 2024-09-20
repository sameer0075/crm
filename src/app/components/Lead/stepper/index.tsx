import React from 'react';
import Lead from '../comments';
import { CommentsInterface } from '@/redux/slices/commentSlice';

// # TODO: Replace SVG's with image tags

const Stepper = ({ data }: CommentsInterface[]) => (
  <section className="">
    <div className="rounded-lg bg-gradient-to-br from-white  via-white to-transparent shadow-lg  p-4 flex flex-col ">
      <ol className="flex pt-20 max-w-[500px] min-w-[500px] w-full mx-auto ">
        <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-[rgba(27,_162,_232,_0.90)] after:border-4 after:inline-block dark:after:border-blue-800">
          <span className=" relative flex items-center justify-center w-[16px] h-[16px] bg-[rgba(27,_162,_232,_0.90)] rounded-full lg:h-[16px] lg:w-[16px] dark:bg-blue-800 shrink-0">
            <div className="absolute bottom-4 flex flex-col items-center justify-center text-[#31AAE9]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M8.8 1H3.31111C2.50215 1 2.09766 1 1.78868 1.15744C1.51689 1.29592 1.29592 1.51689 1.15744 1.78868C1 2.09766 1 2.50215 1 3.31111V8.8C1 9.60896 1 10.0134 1.15744 10.3224C1.29592 10.5942 1.51689 10.8152 1.78868 10.9537C2.09766 11.1111 2.50215 11.1111 3.31111 11.1111H8.8C9.60896 11.1111 10.0134 11.1111 10.3224 10.9537C10.5942 10.8152 10.8152 10.5942 10.9537 10.3224C11.1111 10.0134 11.1111 9.60896 11.1111 8.8V3.31111C11.1111 2.50215 11.1111 2.09766 10.9537 1.78868C10.8152 1.51689 10.5942 1.29592 10.3224 1.15744C10.0134 1 9.60896 1 8.8 1Z"
                  stroke="#31AAE9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.6889 1H19.2C18.391 1 17.9866 1 17.6776 1.15744C17.4058 1.29592 17.1848 1.51689 17.0463 1.78868C16.8889 2.09766 16.8889 2.50215 16.8889 3.31111V8.8C16.8889 9.60896 16.8889 10.0134 17.0463 10.3224C17.1848 10.5942 17.4058 10.8152 17.6776 10.9537C17.9866 11.1111 18.391 11.1111 19.2 11.1111H24.6889C25.4979 11.1111 25.9023 11.1111 26.2113 10.9537C26.4831 10.8152 26.7041 10.5942 26.8426 10.3224C27 10.0134 27 9.60896 27 8.8V3.31111C27 2.50215 27 2.09766 26.8426 1.78868C26.7041 1.51689 26.4831 1.29592 26.2113 1.15744C25.9023 1 25.4979 1 24.6889 1Z"
                  stroke="#31AAE9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.6889 16.8889H19.2C18.391 16.8889 17.9866 16.8889 17.6776 17.0463C17.4058 17.1848 17.1848 17.4058 17.0463 17.6776C16.8889 17.9866 16.8889 18.391 16.8889 19.2V24.6889C16.8889 25.4979 16.8889 25.9023 17.0463 26.2113C17.1848 26.4831 17.4058 26.7041 17.6776 26.8426C17.9866 27 18.391 27 19.2 27H24.6889C25.4979 27 25.9023 27 26.2113 26.8426C26.4831 26.7041 26.7041 26.4831 26.8426 26.2113C27 25.9023 27 25.4979 27 24.6889V19.2C27 18.391 27 17.9866 26.8426 17.6776C26.7041 17.4058 26.4831 17.1848 26.2113 17.0463C25.9023 16.8889 25.4979 16.8889 24.6889 16.8889Z"
                  stroke="#31AAE9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.8 16.8889H3.31111C2.50215 16.8889 2.09766 16.8889 1.78868 17.0463C1.51689 17.1848 1.29592 17.4058 1.15744 17.6776C1 17.9866 1 18.391 1 19.2V24.6889C1 25.4979 1 25.9023 1.15744 26.2113C1.29592 26.4831 1.51689 26.7041 1.78868 26.8426C2.09766 27 2.50215 27 3.31111 27H8.8C9.60896 27 10.0134 27 10.3224 26.8426C10.5942 26.7041 10.8152 26.4831 10.9537 26.2113C11.1111 25.9023 11.1111 25.4979 11.1111 24.6889V19.2C11.1111 18.391 11.1111 17.9866 10.9537 17.6776C10.8152 17.4058 10.5942 17.1848 10.3224 17.0463C10.0134 16.8889 9.60896 16.8889 8.8 16.8889Z"
                  stroke="#31AAE9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1 className="text-[14px]">Leads</h1>
            </div>
          </span>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-[#F3F3F3] after:border-4 after:inline-block dark:after:border-gray-700">
          <span className=" relative flex items-center justify-center w-[16px] h-[16px] bg-[rgba(27,_162,_232,_0.90)] rounded-full lg:h-[16px] lg:w-[16px] dark:bg-gray-700 shrink-0">
            <div className="absolute bottom-4 flex flex-col items-center justify-center text-[#31AAE9] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M1 15L14.4991 21.7896C14.6828 21.882 14.7746 21.9282 14.8709 21.9464C14.9562 21.9625 15.0438 21.9625 15.1291 21.9464C15.2254 21.9282 15.3172 21.882 15.5009 21.7896L29 15M1 22.0416L14.4991 28.8312C14.6828 28.9236 14.7746 28.9697 14.8709 28.9879C14.9562 29.004 15.0438 29.004 15.1291 28.9879C15.2254 28.9697 15.3172 28.9236 15.5009 28.8312L29 22.0416M1 7.95844L14.4991 1.16881C14.6828 1.07644 14.7746 1.03025 14.8709 1.01208C14.9562 0.995975 15.0438 0.995975 15.1291 1.01208C15.2254 1.03025 15.3172 1.07644 15.5009 1.16881L29 7.95844L15.5009 14.7481C15.3172 14.8404 15.2254 14.8866 15.1291 14.9048C15.0438 14.9209 14.9562 14.9209 14.8709 14.9048C14.7746 14.8866 14.6828 14.8404 14.4991 14.7481L1 7.95844Z"
                  stroke="#32ABEA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1 className="text-[14px]">Opportunity</h1>
            </div>
          </span>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-[#F3F3F3] after:border-4 after:inline-block dark:after:border-gray-700">
          <span className=" relative flex items-center justify-center w-[16px] h-[16px] bg-[#D6D3D6] rounded-full lg:h-[16px] lg:w-[16px] dark:bg-gray-700 shrink-0">
            <div className="absolute bottom-4 flex flex-col items-center justify-center text-[#D6D3D6]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M6.4 18.55L9.1 21.25L15.175 15.175M9.1 9.1V5.32C9.1 3.80786 9.1 3.05179 9.39428 2.47423C9.65314 1.96619 10.0662 1.55314 10.5742 1.29428C11.1518 1 11.9079 1 13.42 1H23.68C25.1921 1 25.9482 1 26.5258 1.29428C27.0338 1.55314 27.4469 1.96619 27.7057 2.47423C28 3.05179 28 3.80786 28 5.32V15.58C28 17.0921 28 17.8482 27.7057 18.4258C27.4469 18.9338 27.0338 19.3469 26.5258 19.6057C25.9482 19.9 25.1921 19.9 23.68 19.9H19.9M5.32 28H15.58C17.0921 28 17.8482 28 18.4258 27.7057C18.9338 27.4469 19.3469 27.0338 19.6057 26.5258C19.9 25.9482 19.9 25.1921 19.9 23.68V13.42C19.9 11.9079 19.9 11.1518 19.6057 10.5742C19.3469 10.0662 18.9338 9.65314 18.4258 9.39428C17.8482 9.1 17.0921 9.1 15.58 9.1H5.32C3.80786 9.1 3.05179 9.1 2.47423 9.39428C1.96619 9.65314 1.55314 10.0662 1.29428 10.5742C1 11.1518 1 11.9079 1 13.42V23.68C1 25.1921 1 25.9482 1.29428 26.5258C1.55314 27.0338 1.96619 27.4469 2.47423 27.7057C3.05179 28 3.80786 28 5.32 28Z"
                  stroke="#D2D2D2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1 className="text-[14px]">Apppointments</h1>
            </div>
          </span>
        </li>
        <li className="">
          <span className=" relative flex items-center justify-center w-[16px] h-[16px] bg-[#D6D3D6] rounded-full lg:h-[16px] lg:w-[16px] dark:bg-gray-700 shrink-0">
            <div className="absolute bottom-4 flex flex-col items-center justify-center text-[#D6D3D6]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M14.5 1C16.2728 1 18.0283 1.34919 19.6662 2.02763C21.3041 2.70607 22.7924 3.70047 24.0459 4.95406C25.2995 6.20765 26.2939 7.69588 26.9724 9.33378C27.6508 10.9717 28 12.7272 28 14.5M14.5 1V14.5M14.5 1C7.04416 1 1 7.04416 1 14.5C1 21.9558 7.04416 28 14.5 28C21.9558 28 28 21.9559 28 14.5M14.5 1C21.9558 1 28 7.04416 28 14.5M28 14.5L14.5 14.5M28 14.5C28 16.6304 27.4958 18.7306 26.5286 20.6289C25.5614 22.5271 24.1587 24.1695 22.4351 25.4217L14.5 14.5"
                  stroke="#D2D2D2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1 className="text-[14px]">Deals</h1>
            </div>
          </span>
        </li>
      </ol>
      <Lead data={data} />
    </div>
  </section>
);

export default Stepper;
