declare module 'eslint-plugin-import' {
  import type { ESLint, Linter } from 'eslint';
  const plugin: ESLint.Plugin & {
    configs: {
      recommended: {
        rules: Linter.RulesRecord;
      };
      typescript: {
        rules: Linter.RulesRecord;
        settings: { [name: string]: unknown };
      };
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-react' {
  import type { ESLint } from 'eslint';
  const plugin: ESLint.Plugin & {
    configs: {
      'recommended': {
        rules: Linter.RulesRecord;
      };
      'jsx-runtime': {
        rules: Linter.RulesRecord;
      };
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-react-hooks' {
  import type { ESLint } from 'eslint';
  const plugin: ESLint.Plugin & {
    configs: {
      recommended: {
        rules: Linter.RulesRecord;
      };
    };
  };
  export = plugin;
}

declare module '@next/eslint-plugin-next' {
  import type { ESLint } from 'eslint';
  const plugin: ESLint.Plugin & {
    configs: {
      'recommended': {
        rules: Linter.RulesRecord;
      };
      'core-web-vitals': {
        rules: Linter.RulesRecord;
      };
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-jsx-a11y' {
  import type { ESLint } from 'eslint';
  const plugin: ESLint.Plugin;
  export = plugin;
}
