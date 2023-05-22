import { useEffect } from 'react';
import useLatest from './useLatest';

/**
 * 组件卸载时运行
 * @param fn
 */
const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);
  useEffect(() => () => fnRef.current(), []);
};

export default useUnmount;
