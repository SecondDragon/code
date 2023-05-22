import { useEffect } from 'react';

/**
 * 组件加载时运行
 * @param fn
 */
const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
