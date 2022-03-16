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

type RouterFrom = RouterParams | 'difficult';

interface RouterState {
  from: RouterFrom;
}

export type { User, PasswordChecks, RouterParams, RouterFrom, RouterState };
