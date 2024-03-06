export async function foo() {
  const x = await Promise.resolve(42);
  return x;
}

foo();
foo().catch((err) => {
  const msg = err.toString();
  // eslint-disable-next-line no-console
  console.error(msg);
});
