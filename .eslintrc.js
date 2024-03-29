module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier'
  ],
  plugins: [],
  settings: {
    'import/ignore': [/v-data-table.ts$/]
  },
  rules: {
    // global settings
    semi: [2, 'never'],
    'no-console': 'off',
    // typescript settings
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    // vue settings
    'vue/script-setup-uses-vars': 0,
    'vue/attribute-hyphenation': 0,
    'vue/require-default-prop': 0,
    'vue/no-mutating-props': 0,
    'vue/require-explicit-emits': 0,
    'vue/no-v-model-argument': 0,
    'vue/no-v-html': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-useless-template-attributes': 0,
    'vue/valid-v-for': 0,
    'vue/require-v-for-key': 0,
    'vue/prop-name-casing': 0,
    'vue/no-multiple-template-root': 0
    // nuxt settings
  }
}
