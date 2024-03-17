import config from '@hatena/eslint-config-hatena/flat';
import globals from 'globals';

export default config({ react: true }, [
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
]);
