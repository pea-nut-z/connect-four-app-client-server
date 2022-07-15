module.exports = async () => {
  return {
    rootDir: "src",
    verbose: true,
    setupFilesAfterEnv: ["<rootDir>/__tests__/testSetup.js"],
    // collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!<rootDir>/node_modules/"],
    // resetMocks: true,
    // coverageThreshold: {
    //   global: {
    //     lines: 90,
    //     statements: 90,
    //   },
    // },
    //   verbose: true,
    // clearMocks: true,
    // transform: {
    //   "^.+\\.js$": "babel-jest",
    // },
    // moduleNameMapper: {
    //   "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
    //     "<rootDir>/__mocks__/fileMock.js",
    //   "\\.(css|scss)$": "identity-obj-proxy",
    // },
  };
};
