import {
  QuizQuestion,
  QuizType,
  QuizSession,
  QuizConfig,
  DEFAULT_QUIZ_CONFIG,
  QuizResult,
} from '@/types/quiz';
import { getGreetings } from './greetings';
import { Greeting } from '@/types';

// 퀴즈 문제 생성 함수
export const generateQuizQuestions = (
  config: QuizConfig = DEFAULT_QUIZ_CONFIG
): QuizQuestion[] => {
  const greetings = getGreetings();
  const questions: QuizQuestion[] = [];
  const usedGreetingIds = new Set<string>();

  // 사용 가능한 언어들
  const availableLanguages = ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'de', 'pt'];

  // 각 타입별로 문제 생성
  const questionsPerType = Math.ceil(
    config.questionsPerSession / config.quizTypes.length
  );

  for (const quizType of config.quizTypes) {
    let typeQuestionCount = 0;

    while (
      typeQuestionCount < questionsPerType &&
      questions.length < config.questionsPerSession
    ) {
      // 아직 사용하지 않은 인사말 찾기
      const availableGreetings = greetings.filter(
        (g) => !usedGreetingIds.has(g.id)
      );
      if (availableGreetings.length === 0) break;

      // 무작위로 인사말 선택
      const randomGreeting =
        availableGreetings[
          Math.floor(Math.random() * availableGreetings.length)
        ];
      usedGreetingIds.add(randomGreeting.id);

      // 이 인사말에서 사용 가능한 언어들
      const greetingLanguages = availableLanguages.filter(
        (lang) => randomGreeting.translations[lang]
      );

      if (greetingLanguages.length < 4) continue; // 최소 4개 언어 필요

      // 정답 언어 선택
      const correctLanguage =
        greetingLanguages[Math.floor(Math.random() * greetingLanguages.length)];

      // 오답 옵션 생성 (3개)
      const incorrectOptions = greetingLanguages
        .filter((lang) => lang !== correctLanguage)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // 모든 옵션 (정답 포함)
      const allOptions = [correctLanguage, ...incorrectOptions];
      if (config.randomizeOptions) {
        allOptions.sort(() => Math.random() - 0.5);
      }

      const question: QuizQuestion = {
        id: `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: quizType,
        greetingId: randomGreeting.id,
        correctLanguage,
        options: allOptions,
      };

      if (quizType === 'meaning-to-language') {
        question.koreanMeaning = randomGreeting.translations.ko.text;
      } else if (quizType === 'audio-to-language') {
        question.audioUrl =
          randomGreeting.translations[correctLanguage].audioUrl;
      }

      questions.push(question);
      typeQuestionCount++;
    }
  }

  // 문제 순서 섞기
  return questions.sort(() => Math.random() - 0.5);
};

// 새 퀴즈 세션 생성
export const createQuizSession = (
  config: QuizConfig = DEFAULT_QUIZ_CONFIG
): QuizSession => {
  const questions = generateQuizQuestions(config);

  return {
    id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    questions,
    answers: [],
    startedAt: new Date(),
    score: 0,
    totalQuestions: questions.length,
    currentQuestionIndex: 0,
  };
};

// 퀴즈 결과 계산
export const calculateQuizResult = (session: QuizSession): QuizResult => {
  const correctAnswers = session.answers.filter((a) => a.isCorrect).length;
  const incorrectAnswers = session.answers.filter((a) => !a.isCorrect).length;
  const percentage = Math.round(
    (correctAnswers / session.totalQuestions) * 100
  );
  const totalTimeSpent = session.answers.reduce(
    (sum, answer) => sum + answer.timeSpent,
    0
  );

  // 결과 메시지 및 이모지
  let message = '';
  let emoji = '';

  if (percentage === 100) {
    message = '완벽해요! 모든 문제를 맞혔어요!';
    emoji = '🎉';
  } else if (percentage >= 80) {
    message = '훌륭해요! 거의 다 맞혔어요!';
    emoji = '🌟';
  } else if (percentage >= 60) {
    message = '잘했어요! 조금만 더 연습해봐요!';
    emoji = '😊';
  } else if (percentage >= 40) {
    message = '괜찮아요! 다시 한번 도전해봐요!';
    emoji = '💪';
  } else {
    message = '아직 배울 게 많아요! 포기하지 마세요!';
    emoji = '🌈';
  }

  return {
    sessionId: session.id,
    score: correctAnswers,
    totalQuestions: session.totalQuestions,
    percentage,
    timeSpent: totalTimeSpent,
    message,
    emoji,
    correctAnswers,
    incorrectAnswers,
  };
};

// 언어 코드를 언어 이름으로 변환
export const getLanguageName = (langCode: string): string => {
  const languageNames: Record<string, string> = {
    ko: '한국어',
    en: '영어',
    ja: '일본어',
    zh: '중국어',
    fr: '프랑스어',
    es: '스페인어',
    de: '독일어',
    pt: '포르투갈어',
  };

  return languageNames[langCode] || langCode;
};

// 인사말 ID로 인사말 찾기
export const getGreetingById = (greetingId: string): Greeting | undefined => {
  const greetings = getGreetings();
  return greetings.find((g) => g.id === greetingId);
};
