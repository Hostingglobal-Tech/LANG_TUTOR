'use client';

import { useState } from 'react';

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-shadow">
          🌍 다국어 인사말 배우기 🌍
        </h1>
        <p className="text-lg text-gray-600">
          재미있게 여러 나라의 인사말을 배워보세요!
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            언어 선택
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { code: 'ko', name: '한국어', flag: '🇰🇷' },
              { code: 'en', name: 'English', flag: '🇺🇸' },
              { code: 'ja', name: '日本語', flag: '🇯🇵' },
              { code: 'zh', name: '中文', flag: '🇨🇳' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedLanguage === lang.code
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                aria-label={`${lang.name} 선택`}
              >
                <div className="text-3xl mb-2">{lang.flag}</div>
                <div className="font-medium text-gray-800">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            인사말 카드
          </h2>
          <div className="text-center text-gray-600">
            <p>곧 인사말 카드들이 여기에 표시될 예정입니다!</p>
            <p className="mt-2">선택된 언어: {selectedLanguage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
