interface LearningProgressProps {
  difficulty?: 'weak' | 'hard' | undefined;
  progress?: number;
  isLearned?: boolean;
  answers?: boolean[];
  wordId?: string;
}

export type { LearningProgressProps };
