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

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTrack: string | null;
  volume: number;
  duration: number;
  currentTime: number;
}

export interface UserSettings {
  fontSize: 'small' | 'medium' | 'large';
  darkMode: boolean;
  backgroundSound: boolean;
  autoplay: boolean;
}
