interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

interface RegistrationChecks {
  name: boolean;
  email: boolean;
  password: boolean;
}

export type { RegistrationChecks, RegistrationData };
