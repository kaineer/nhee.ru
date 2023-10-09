// webpack.config.js

const { join } = require("path");

const mode = () => {
  if (process.env["WP_MODE"] === "prod") {
    return "production";
  }
  return "development";
}

module.exports = () => {
  return {
    mode: mode(),
    entry: "./src/index.ts",
    output: {
      path: join(__dirname, "dist"),
      filename: "bundle.js"
    }
  };
};
