interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface PasswordChecks {
  length: boolean;
  differentCase: boolean;
  numbers: boolean;
}

export type { User, PasswordChecks };
