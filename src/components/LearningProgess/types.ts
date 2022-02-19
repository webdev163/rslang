interface LearningProgressProps {
  difficulty?: 'weak' | 'hard' | undefined;
  progress?: number;
  isLearned?: boolean;
  answers?: boolean[];
}

export type { LearningProgressProps };
