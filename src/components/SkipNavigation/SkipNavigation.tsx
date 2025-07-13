'use client';

const SkipNavigation = () => {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
        z-50 px-4 py-2 bg-blue-600 text-white text-sm font-medium 
        rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300
        transition-all duration-200
      "
    >
      본문으로 건너뛰기
    </a>
  );
};

export default SkipNavigation;
