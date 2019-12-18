import { isEmpty } from 'lodash';
import {
  useCallback,
  useState,
} from 'react';

export const appendResponseMessage = ({ setResponseMessages }) => ({ msg }) => {
  setResponseMessages((oldResponseMessages) => {
    if (isEmpty(oldResponseMessages)) {
      return [msg];
    }
    return [
      ...oldResponseMessages,
      msg,
    ];
  });
};

export const clearResponseMessage = ({ setResponseMessages }) => () => { setResponseMessages([]); };

export const useResponseMessage = () => {
  const [responseMessages, setResponseMessages] = useState([]);

  return {
    responseMessages,
    appendResponseMessage: useCallback(appendResponseMessage({ setResponseMessages }), []),
    clearResponseMessage: useCallback(clearResponseMessage({ setResponseMessages }), []),
  };
};
