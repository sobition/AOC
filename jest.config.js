module.exports = {
  testEnvironment: 'node', // Use Node.js environment for testing
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'], // Match test files
  collectCoverage: true, // Enable code coverage
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/__tests__/**'], // Exclude node_modules and test files
  automock: false, // Disable automatic mocking
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
