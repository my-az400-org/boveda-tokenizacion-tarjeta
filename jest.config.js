module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'src/libs/*'
  ],
  testMatch: [
    '**/*.steps.js'
  ],
  testTimeout: 30000,
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
  collectCoverage: true
};
