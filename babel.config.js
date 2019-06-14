module.exports = {
  "ignore": [
    "node_modules/",
    "public/",
    "esm/",
    "lib/",
    "tmp/",
    "dist/",
    "__tests__",
    "__mocks__"
  ],
  "plugins": [
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    [
      "babel-plugin-transform-dev",
      {
        "evaluate": false
      }
    ],
    "babel-plugin-typescript-to-proptypes"
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false,
        "shippedProposals": true,
        "targets": {
          "ie": 10
        },
        "useBuiltIns": false
      }
    ],
    "@babel/preset-react",
    [
      "minify",
      {
        "removeUndefined": false,
        "evaluate": false,
        "builtIns": false
      }
    ],
    "@babel/preset-typescript"
  ]
};