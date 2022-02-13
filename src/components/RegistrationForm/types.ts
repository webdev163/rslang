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

interface RegistrationFormProps {
  onDone?: CallableFunction;
}
export type { RegistrationChecks, RegistrationData, RegistrationFormProps };
