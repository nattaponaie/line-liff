module.exports = {
  testMatch: [
    '<rootDir>/__tests__/**/*.test.{js,jsx,mjs}',
  ],
  transform: {
    '\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text-summary',
    'html',
    'json',
    'cobertura',
  ],
  collectCoverageFrom: [
    'src/**/*.(js)',
  ],
  moduleNameMapper: {
    '^/api(.*)$': '<rootDir>/server/api$1',
    '^/utils(.*)$': '<rootDir>/utils$1',
  },
};
