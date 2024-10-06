import config from '@hatena/eslint-config-hatena/flat';
import globals from 'globals';

export default config({ next: true }, [
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
]);
