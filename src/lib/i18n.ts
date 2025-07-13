import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-resources-to-backend';
import { getLanguages } from './greetings';

const languages = getLanguages();

// Create resources for i18next
const resources = languages.reduce(
  (acc, lang) => {
    acc[lang.code] = {
      common: {
        // Basic UI elements
        language_selector: '언어 선택',
        language_list: '언어 목록',
        select_language: '언어를 선택하세요',

        // Language names (displayed in Korean for the UI)
        languages: {
          ko: '한국어',
          en: '영어',
          ja: '일본어',
          zh: '중국어',
          es: '스페인어',
          fr: '프랑스어',
          de: '독일어',
          ar: '아랍어',
        },

        // App content
        app_title: '다국어 인사말 학습',
        app_subtitle: '초등학생을 위한 재미있는 언어 학습',
        welcome_message: '안녕하세요! 다양한 언어로 인사말을 배워보세요.',

        // Categories
        categories: {
          basic: '기본 인사',
          polite: '정중한 표현',
          time_based: '시간별 인사',
          farewell: '작별 인사',
          apology: '사과',
          response: '응답',
          introduction: '소개',
          inquiry: '안부',
        },

        // Difficulties
        difficulties: {
          1: '쉬움',
          2: '보통',
          3: '어려움',
        },

        // Actions
        play_audio: '음성 재생',
        listen: '듣기',
        practice: '연습하기',
        next: '다음',
        previous: '이전',
      },
    };
    return acc;
  },
  {} as Record<string, any>
);

i18n
  .use(
    Backend((language: string, namespace: string) => {
      // Return the resources for the requested language and namespace
      return Promise.resolve(resources[language]?.[namespace] || {});
    })
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'ko', // Default language (Korean UI)
    fallbackLng: 'ko',

    // Available languages
    supportedLngs: languages.map((lang) => lang.code),

    // Namespace configuration
    ns: ['common'],
    defaultNS: 'common',

    detection: {
      // Language detection options
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'selectedUILanguage',
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
