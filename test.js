const blah = () => {
  const test = 1.3;
  const bar = null;
  const foo = '';
  if (test === bar) {
    return foo;
  }
  return this;
};
