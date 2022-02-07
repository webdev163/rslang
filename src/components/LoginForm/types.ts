interface LoginChecks {
  email: boolean;
  password: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

export type { LoginChecks, LoginData };
