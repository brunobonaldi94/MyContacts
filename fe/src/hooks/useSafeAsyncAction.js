import {
  useCallback,
} from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback((action) => {
    if (isMounted()) {
      action();
    }
  }, [isMounted]);
  return setSafeAsyncState;
}
