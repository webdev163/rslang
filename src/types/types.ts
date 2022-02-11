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

interface RouterParams {
  group: string;
  page: string;
}

interface RouterState {
  from: RouterParams;
}

export type { User, PasswordChecks, RouterParams, RouterState };
