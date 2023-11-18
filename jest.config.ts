// import type {Config} from '@jest/types';
// // Sync object
// const config: Config.InitialOptions = {
//   verbose: true,
//   transform: {
//   '^.+\\.tsx?$': 'ts-jest',
//   },
// };
// export default config;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};