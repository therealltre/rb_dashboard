const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/tests/**/*.[jt]s?(x)', '<rootDir>/**/*.{test,spec}.[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/guards/(.*)$': '<rootDir>/src/guards/$1',
    '^@/routes/(.*)$': '<rootDir>/src/routes/$1',
    // Add more mappings if necessary
  },
};

module.exports = createJestConfig(customJestConfig);
