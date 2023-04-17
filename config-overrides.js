const path = require("path");

module.exports = function override(config, env) {
  const babelLoader = config.module.rules.find((rule) =>
    Array.isArray(rule.oneOf)
  ).oneOf.find((rule) =>
    rule.loader && rule.loader.includes("babel-loader")
  );

  if (!babelLoader) {
    throw new Error("Cannot find babel-loader in the Webpack config.");
  }

  config.module.rules.push({
    test: /\.tsx?$/,
    include: [path.resolve(__dirname, "src/tina/__generated__/types.ts")],
    use: [babelLoader.loader],
  });

  return config;
};
