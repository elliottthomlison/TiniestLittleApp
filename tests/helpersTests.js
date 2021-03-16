const assert = require('chai').assert;

const { getUserByEmail, urlsForUser } = require('../helpers');

//this portion is for testing urlsForUser 
//i should speak with a mentor regarding this
const testUrls = {
  'abcd': {
    longURL: 'http://www.google.com',
    userID: 'jack'
  },
  'xywz': {
    longURL: 'http://www.reddit.com',
    userID: 'jill'
  },
  'jfkd': {
    longURL: 'http://www.facebook.com',
    userID: 'hill'
  }
};

describe('#urlsForUser', () => {
  it('should return the corresponding urls for a valid user', () => {
    const userUrls = urlsForUser('jack', testUrls);
    const expectedResult = {
      'abcd': {
        longURL: 'http://www.google.com',
        userID: 'jack'
      },
      'jfkd': {
        longURL: 'http://www.facebook.com',
        userID: 'jack'
      }
    };

    assert.deepEqual(userUrls, expectedResult);
  });

  it('should return an empty obhect for a non-existent user', () => {
    const userUrls = urlsForUser('crystal', testUrls);
    assert.deepEqual(userUrls, {});
  });
});

//this portion is testing the getUserByEmail
const testUsers = {
  'abc': {
    id: 'abc',
    email: 'jack@example.com',
    password: 'bruh'
  },
  'xyz': {
    id: 'xyz',
    email: 'jill@example.com',
    password: 'end-it-now'
  }
};

describe('#getUserByEmail', () => {
  it('valid email with user this should return', () => {
    const user = getUserByEmail('jill@example.com', testUsers);
    assert.equal(user, testUsers.xyz);
  });

  it('email not exist undefined it should return', () => {
    const user = getUserByEmail('hill@example.com', testUsers);
    assert.equal(user, undefined);
  });
});

