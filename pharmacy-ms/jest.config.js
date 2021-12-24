module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/singleton.ts']
};
