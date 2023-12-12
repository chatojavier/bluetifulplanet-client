// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': ['<rootDir>/app/$1'],
    '^@components/(.*)$': ['<rootDir>/app/components/$1'],
    '^@graphql/(.*)$': ['<rootDir>/app/graphql/$1'],
    '^@hooks/(.*)$': ['<rootDir>/app/hooks/$1'],
    '^@services/(.*)$': ['<rootDir>/app/services/$1'],
    '^@utils/(.*)$': ['<rootDir>/app/utils/$1'],
    '^@pages/(.*)$': ['<rootDir>/app/(pages)/$1'],
    '^@mocks/(.*)$': ['<rootDir>/app/__mocks__/$1'],
    '^types/(.*)$': ['<rootDir>/app/types/*'],
    'swiper/css': 'identity-obj-proxy',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: ['node_modules/(?!(swiper|ssr-window|dom7)/)'],
});
