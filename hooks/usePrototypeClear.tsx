import { useLayoutEffect } from 'react';

const usePrototypeClear = (id: string | null) => {
  useLayoutEffect(() => {
    if (id) {
      const prototype = document.getElementById(id);
      prototype?.setAttribute('style', '');
      prototype?.setAttribute('data-loading', `false`);
    }
  }, [id]);
};

export default usePrototypeClear;
