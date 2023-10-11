import { createContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
enum AuthStates {
  Initial,
  Login,
  Logout,
  Register,
  ChangeState,
}
type User = {
  email: string;
  userName: string;
};
type initialStateType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};
const initialState = {
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext(initialState as initialStateType);

const authReducer = (
  state: initialStateType,
  action: { type: AuthStates; payload?: any }
) => {
  console.log('🚀 ~ file: AuthContext.tsx:23 ~ action:', action);

  switch (action.type) {
    case AuthStates.Initial:
      console.log('🚀 ~ file: AuthContext.tsx:29 ~ payload');
      return { ...state, ...action.payload };
    case AuthStates.Login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case AuthStates.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const email = localStorage.getItem('email');
        if (token) {
          dispatch({
            type: AuthStates.Initial,
            payload: {
              isAuthenticated: true,
              user: {
                userName: 'Marcus',
                email: email || 'defaultEmail@example.com',
              },
            },
          });
          navigate('/');
        }
      } catch (err) {
        throw new Error(err as string);
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    localStorage.setItem('accessToken', 'some_token');
    localStorage.setItem('email', email);
    dispatch({
      type: AuthStates.Login,
      payload: {
        user: {
          userName: 'Marcus',
          email: email || 'defaultEmail@example.com',
        },
      },
    });
    navigate('/');
  };

  const logout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    dispatch({ type: AuthStates.Logout });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
