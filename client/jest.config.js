module.exports = async () => {
  return {
    rootDir: "src",
    verbose: true,
    setupFilesAfterEnv: ["<rootDir>/__tests__/testSetup.js"],
    testPathIgnorePatterns: [
      // "<rootDir>/__tests__/integration_tests/auth.test.js",
      "<rootDir>/__tests__/testSetup.js",
      "<rootDir>/__tests__/mockSocketio.js",
    ],
  };
};
