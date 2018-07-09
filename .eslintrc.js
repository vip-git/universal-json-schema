module.exports = {
  extends: 'airbnb',
  "rules": {
    "react/prop-types": "off",
    "react/jsx-curly-brace-presence": "off",
    "react/prefer-stateless-function": "off",
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to"]
    }],
    "class-methods-use-this": "off",
    "function-paren-newline": "off",
    "jsx-quotes": ["error", "prefer-single"],
    "quote-props": ["error", "consistent"],
    "max-len": ["warn", { "code": 120 }],
    "brace-style": ["error", "stroustrup"],
    "no-plusplus": "off",
    "object-curly-newline": "off",
  },
  "parser": "babel-eslint"
}
