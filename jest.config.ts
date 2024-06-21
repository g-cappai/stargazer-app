import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  preset: "jest-expo",
};

export default config;
