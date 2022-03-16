export interface ResultsDialogProps {
  showResult: boolean;
  score: number;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
