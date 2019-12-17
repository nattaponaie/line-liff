import { isEmpty } from 'lodash';
import {
  useCallback,
  useState,
} from 'react';

export const appendErrorMessage = ({ setErrorMessages }) => ({ msg }) => {
  setErrorMessages((oldErrorMessages) => {
    if (isEmpty(oldErrorMessages)) {
      return [msg];
    }
    return [
      ...oldErrorMessages,
      msg,
    ];
  });
};

export const clearErrorMessage = ({ setErrorMessages }) => () => { setErrorMessages([]); };

export const useErrorMessage = () => {
  const [errorMessages, setErrorMessages] = useState([]);

  return {
    errorMessages,
    appendErrorMessage: useCallback(appendErrorMessage({ setErrorMessages }), []),
    clearErrorMessage: useCallback(clearErrorMessage({ setErrorMessages }), []),
  };
};
