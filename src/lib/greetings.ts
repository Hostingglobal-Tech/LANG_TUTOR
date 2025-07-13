import greetingsData from '../data/greetings.json';

export interface GreetingTranslation {
  text: string;
  pronunciation: string;
  audioUrl: string;
  notes: string;
}

export interface Greeting {
  id: string;
  korean: string;
  category:
    | 'basic'
    | 'polite'
    | 'time_based'
    | 'farewell'
    | 'apology'
    | 'response'
    | 'introduction'
    | 'inquiry';
  situation: string;
  difficulty: 1 | 2 | 3;
  translations: Record<string, GreetingTranslation>;
  imageUrl: string;
  tags: string[];
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  fontFamily: string;
}

export interface GreetingsData {
  metadata: {
    version: string;
    lastUpdated: string;
    description: string;
    targetAge: string;
    totalLanguages: number;
    totalGreetings: number;
  };
  languages: Language[];
  greetings: Greeting[];
}

// Type-safe data access
export const getGreetingsData = (): GreetingsData => {
  return greetingsData as GreetingsData;
};

// Helper functions
export const getLanguages = (): Language[] => {
  return getGreetingsData().languages;
};

export const getLanguageByCode = (code: string): Language | undefined => {
  return getLanguages().find((lang) => lang.code === code);
};

export const getGreetings = (): Greeting[] => {
  return getGreetingsData().greetings;
};

export const getGreetingById = (id: string): Greeting | undefined => {
  return getGreetings().find((greeting) => greeting.id === id);
};

export const getGreetingsByCategory = (
  category: Greeting['category']
): Greeting[] => {
  return getGreetings().filter((greeting) => greeting.category === category);
};

export const getGreetingsByDifficulty = (difficulty: 1 | 2 | 3): Greeting[] => {
  return getGreetings().filter(
    (greeting) => greeting.difficulty === difficulty
  );
};

export const getGreetingTranslation = (
  greetingId: string,
  languageCode: string
): GreetingTranslation | undefined => {
  const greeting = getGreetingById(greetingId);
  return greeting?.translations[languageCode];
};

// Statistics
export const getStatistics = () => {
  const data = getGreetingsData();
  const greetings = getGreetings();

  return {
    totalLanguages: data.languages.length,
    totalGreetings: greetings.length,
    totalTranslations: greetings.length * data.languages.length,
    categoryCounts: greetings.reduce(
      (acc, greeting) => {
        acc[greeting.category] = (acc[greeting.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
    difficultyCounts: greetings.reduce(
      (acc, greeting) => {
        acc[greeting.difficulty] = (acc[greeting.difficulty] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>
    ),
  };
};

// Validation helpers
export const validateGreetingData = (
  greeting: Greeting,
  languages: Language[]
): string[] => {
  const errors: string[] = [];

  // Check required fields
  if (!greeting.id) errors.push('Missing greeting ID');
  if (!greeting.korean) errors.push('Missing Korean text');
  if (!greeting.imageUrl) errors.push('Missing image URL');

  // Check translations for all languages
  languages.forEach((lang) => {
    const translation = greeting.translations[lang.code];
    if (!translation) {
      errors.push(`Missing translation for ${lang.name} (${lang.code})`);
    } else {
      if (!translation.text) errors.push(`Missing text for ${lang.name}`);
      if (!translation.pronunciation)
        errors.push(`Missing pronunciation for ${lang.name}`);
      if (!translation.audioUrl)
        errors.push(`Missing audio URL for ${lang.name}`);
    }
  });

  return errors;
};

export const validateAllData = (): { isValid: boolean; errors: string[] } => {
  const data = getGreetingsData();
  const errors: string[] = [];

  // Validate each greeting
  data.greetings.forEach((greeting) => {
    const greetingErrors = validateGreetingData(greeting, data.languages);
    errors.push(...greetingErrors.map((err) => `${greeting.id}: ${err}`));
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
