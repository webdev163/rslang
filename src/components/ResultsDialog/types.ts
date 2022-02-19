export interface ResultsDialogProps {
  showResult: boolean;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
