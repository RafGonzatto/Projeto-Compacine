import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  roots: ['<rootDir>/src/tests'], 
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  detectOpenHandles: true,
};

export default config;