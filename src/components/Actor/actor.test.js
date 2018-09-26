// Copyright 2004-present Facebook. All Rights Reserved.

'use strict';

jest.mock('../../js/request'); // real request

import * as user from './user';

// Testing promise can be done using `.resolves`.
it('works with resolves', () => {
  expect.assertions(1);
  return expect(user.getUserName(18918)).resolves.toEqual('Dwayne Johnson');
});

// The assertion for a promise must be returned.
it('works with promises', () => {
  expect.assertions(1);
  return user
    .getUserName(18918)
    .then(data => expect(data).toEqual('Dwayne Johnson'));
});

// async/await can be used.
it('works with async/await', async () => {
  expect.assertions(1);
  const data = await user.getUserName(18918);
  expect(data).toEqual('Dwayne Johnson');
});

// async/await can also be used with `.resolves`.
it('works with async/await and resolves', async () => {
  expect.assertions(1);
  await expect(user.getUserName(18918)).resolves.toEqual('Dwayne Johnson');
});

// Testing for async errors using `.rejects`.
it('tests error with rejects', () => {
  expect.assertions(1);
  return expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.'
  });
});

// Testing for async errors using Promise.catch.
test('tests error with promises', async () => {
  expect.assertions(1);
  return user.getUserName(2).catch(e =>
    expect(e).toEqual({
      error: 'User with 2 not found.'
    })
  );
});

// Or using async/await.
it('tests error with async/await', async () => {
  expect.assertions(1);
  try {
    await user.getUserName(1);
  } catch (e) {
    expect(e).toEqual({
      error: 'User with 1 not found.'
    });
  }
});

// // Or using async/await with `.rejects`.
it('tests error with async/await and rejects', async () => {
  expect.assertions(1);
  await expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.'
  });
});
