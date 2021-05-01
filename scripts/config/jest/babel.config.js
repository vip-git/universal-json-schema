module.exports = {
    "presets": [
        [
          "@babel/preset-env", { "targets": { "node": "current" }}
        ],
        ["@babel/preset-react", {"targets": {"node": "current"}}]
      ],
      "plugins": [
        [
          "@babel/plugin-proposal-class-properties", { "loose": true }
        ],
        "@babel/plugin-transform-runtime"
      ]
};