import { element } from 'prop-types';
import {
  createContext,
  useReducer,
} from 'react';

const initialState = {
  lineUserId: undefined,
  displayName: undefined,
  pictureUrl: undefined,
};

const UserContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'info':
      return { ...action.userinfo };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      { children }
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: element.isRequired,
};

export { UserContext, UserContextProvider };
