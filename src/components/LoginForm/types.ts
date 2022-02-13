interface LoginChecks {
  email: boolean;
  password: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onDone?: CallableFunction;
}

export type { LoginChecks, LoginData, LoginFormProps };
