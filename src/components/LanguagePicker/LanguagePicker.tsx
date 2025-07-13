'use client';

import { useState, useRef, useEffect } from 'react';
import { Language } from '@/types';
import { getLanguages } from '@/lib/greetings';

interface LanguagePickerProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  className?: string;
}

export default function LanguagePicker({
  selectedLanguage,
  onLanguageChange,
  className = '',
}: LanguagePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const languages = getLanguages();

  const selectedLang = languages.find((lang) => lang.code === selectedLanguage);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(
            languages.findIndex((lang) => lang.code === selectedLanguage)
          );
        } else if (focusedIndex >= 0) {
          onLanguageChange(languages[focusedIndex].code);
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(
            languages.findIndex((lang) => lang.code === selectedLanguage)
          );
        } else {
          setFocusedIndex((prev) =>
            prev < languages.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : languages.length - 1
          );
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(languages.length - 1);
        }
        break;
    }
  };

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          flex items-center justify-between min-w-[200px] px-4 py-3 
          text-left bg-white border-2 border-gray-200 rounded-lg 
          hover:border-blue-300 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-offset-2 transition-colors 
          duration-200 shadow-sm hover:shadow-md
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : ''}
        `}
        aria-label="언어 선택"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl" role="img" aria-hidden="true">
            {selectedLang?.flag}
          </span>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {selectedLang?.name}
            </span>
            <span className="text-sm text-gray-500">
              {selectedLang?.nativeName}
            </span>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
          role="listbox"
          aria-label="언어 목록"
        >
          {languages.map((language, index) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`
                w-full flex items-center px-4 py-3 text-left 
                hover:bg-blue-50 focus:bg-blue-50 focus:outline-none
                transition-colors duration-150
                ${language.code === selectedLanguage ? 'bg-blue-100' : ''}
                ${
                  index === focusedIndex
                    ? 'bg-blue-50 ring-2 ring-inset ring-blue-500'
                    : ''
                }
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === languages.length - 1 ? 'rounded-b-lg' : ''}
              `}
              role="option"
              aria-selected={language.code === selectedLanguage}
              type="button"
            >
              <span className="text-2xl mr-3" role="img" aria-hidden="true">
                {language.flag}
              </span>
              <div className="flex flex-col">
                <span
                  className={`font-medium ${
                    language.code === selectedLanguage
                      ? 'text-blue-900'
                      : 'text-gray-900'
                  }`}
                >
                  {language.name}
                </span>
                <span
                  className={`text-sm ${
                    language.code === selectedLanguage
                      ? 'text-blue-700'
                      : 'text-gray-500'
                  }`}
                  dir={language.direction}
                >
                  {language.nativeName}
                </span>
              </div>
              {language.code === selectedLanguage && (
                <svg
                  className="w-5 h-5 ml-auto text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
