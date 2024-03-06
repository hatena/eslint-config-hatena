export async function foo(): Promise<number> {
  const x = await Promise.resolve(42);
  return x;
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
foo();
foo().catch((err) => {
  const msg = err.toString();
  // eslint-disable-next-line no-console
  console.error(msg);
});

import React from 'react';

export const Foo: React.FC = () => {
  return <h1>Hello</h1>;
};
