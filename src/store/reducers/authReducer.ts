import { AuthAction, AuthState, RegistrationActionTypes, SignInActionTypes } from '../../types/user';

const initialState: AuthState = {
  user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
  isAuthorized: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SignInActionTypes.SIGN_IN:
      return {
        user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
        isAuthorized: false,
        loading: true,
        error: null,
      };

    case SignInActionTypes.SUCCESS:
      return {
        user: action.payload,
        isAuthorized: true,
        loading: false,
        error: null,
      };

    case SignInActionTypes.ERROR:
      return {
        user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
        isAuthorized: false,
        loading: false,
        error: action.payload,
      };
    case RegistrationActionTypes.REGISTRATION:
      return {
        user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
        isAuthorized: false,
        loading: true,
        error: null,
      };

    case RegistrationActionTypes.SUCCESS:
      return {
        user: {
          message: '',
          refreshToken: '',
          userId: action.payload.id,
          name: action.payload.name,
          token: action.payload.email,
        },
        isAuthorized: true,
        loading: false,
        error: null,
      };

    case RegistrationActionTypes.ERROR:
      return {
        user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
        isAuthorized: false,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { authReducer };
