export interface Greeting {
  id: string;
  korean: string;
  romanized: string;
  audioUrl: string;
  illustrationUrl: string;
  category: 'basic' | 'polite' | 'casual' | 'special';
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  greetings: Greeting[];
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
