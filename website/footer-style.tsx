import React from 'react';

export const FooterContent = () => (
  <div className="flex flex-col items-center">
    <div className="border-t border-gray-200 dark:border-gray-800 w-full max-w-4xl mx-auto my-4"></div>
    <div className="text-sm text-gray-500 dark:text-gray-400 py-4">
      <div className="flex flex-wrap justify-center gap-x-2 mb-2">
        <span>Copyright © 2025 - 2026</span>
        <span className="font-medium text-gray-600 dark:text-gray-300">重庆华飞数智互联网科技有限责任公司</span>
        <span>版权所有</span>
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 items-center">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          18996366862
        </span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          重庆市渝中区七星岗街道中山一路85号4层1-5-421
        </span>
      </div>
      <div className="mt-2 flex justify-center items-center gap-4">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          ICP备案：渝ICP备2025052425号-1
        </a>
        <a href="https://beian.mps.gov.cn/#/query/webSearch?code=50010302505359" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-500 transition-colors">
          <img src="/static/china-police.png" alt="公安备案图标" className="h-4 mr-1" />
          渝公网安备50010302505359号
        </a>
      </div>
    </div>
  </div>
); 