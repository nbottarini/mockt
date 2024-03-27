module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(js|ts)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'ts'],
    testRegex: '/test/(.*)\\.test\\.(ts|js)$',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}
