/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = {
  plugins: [
    require("postcss-import")({
      path: ["./src/demo"]
    }),
    require("postcss-nested")(),
    require("postcss-custom-properties")(),
    require("postcss-flexbugs-fixes")(),
    require("autoprefixer")({}),
    require("postcss-custom-properties")(),
    require("postcss-assets")({
      basePath: "./assets"
    }),
    require("postcss-normalize")()
  ],
  sourceMap: true
};
