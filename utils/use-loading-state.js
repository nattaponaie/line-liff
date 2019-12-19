import {
  useCallback,
  useMemo,
  useState,
} from 'react';

export const useLoadingState = (initialState = null) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const requestWrapper = useCallback(async (callback, resetState = false) => {
    try {
      if (resetState) setState(null);
      setLoading(true); // start request
      const result = await callback();
      setState(result);

      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false); // request success / fail
    }
  }, []);

  return useMemo(() => [
    loading,
    state,
    requestWrapper,
    setState,
  ], [loading, state, requestWrapper]);
};
