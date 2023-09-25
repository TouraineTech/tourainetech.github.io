module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "vue/attributes-order": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off"
  }
}
