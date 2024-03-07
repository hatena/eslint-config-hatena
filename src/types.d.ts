declare module 'eslint-plugin-import' {
  import type { Settings, Rules } from 'eslint-define-config';

  const configs: {
    recommended: {
      rules: Partial<Rules>;
    };
    typescript: {
      settings: Settings;
      rules: Partial<Rules>;
    };
  };
}

declare module 'eslint-plugin-react' {
  import type { Rules } from 'eslint-define-config';

  const configs: {
    recommended: {
      rules: Partial<Rules>;
    };
  };
}

declare module 'eslint-plugin-react-hooks' {
  import type { Rules } from 'eslint-define-config';

  const configs: {
    recommended: {
      rules: Partial<Rules>;
    };
  };
}
