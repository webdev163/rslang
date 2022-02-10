import { AuthAction, AuthState, RegistrationActionTypes, SignInActionTypes } from '../../types/user';
const initialState: AuthState = {
  user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
  isAuthorized: false,
  loading: false,
  error: null,
  email: '',
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SignInActionTypes.SIGN_IN:
      return {
        ...state,
        user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
        isAuthorized: false,
        loading: true,
        error: null,
        email: action.payload,
      };

    case SignInActionTypes.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthorized: true,
        loading: false,
        error: null,
      };

    case SignInActionTypes.ERROR:
      return {
        ...state,
        user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
        isAuthorized: false,
        loading: false,
        error: action.payload.toString(),
      };
    case SignInActionTypes.SIGN_OUT:
      return {
        ...state,
        user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
        isAuthorized: false,
        loading: false,
        error: null,
      };
    case RegistrationActionTypes.REGISTRATION:
      return {
        ...state,
        user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
        isAuthorized: false,
        loading: true,
        error: null,
        email: action.payload,
      };

    case RegistrationActionTypes.SUCCESS:
      return {
        ...state,
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
        ...state,
        user: { message: '', refreshToken: '', userId: '', name: '', token: '' },
        isAuthorized: false,
        loading: false,
        error: action.payload.toString(),
      };

    default:
      return state;
  }
};

export { authReducer };
