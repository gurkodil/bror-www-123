const OFF = 0,
    WARN = 1,
    ERROR = 2

const lax = () => {
    return {
        parser: "@typescript-eslint/parser", // Specifies the ESLint parser
        extends: [
            "eslint:recommended",
            "plugin:react/recommended",
            // "plugin:@typescript-eslint/recommended",
            // "prettier/@typescript-eslint",
            "airbnb-base",
            "prettier",
            "prettier/@typescript-eslint",
            "prettier/babel",
            "prettier/flowtype",
            "prettier/react",
            "prettier/standard",
            "prettier/unicorn",
            "prettier/vue"
        ],
        settings: {
            react: {
                version: "detect"
            }
        },
        env: {
            browser: true,
            node: true,
            es6: true
        },
        plugins: ["@typescript-eslint", "react", "prettier"],
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            },
            ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
            sourceType: "module" // Allows for the use of imports
        },
        rules: {
            indent: [ERROR, 4], // My
            semi: [ERROR, "never"],
            "space-before-blocks": OFF,
            "import/no-unresolved": OFF,
            "comma-style": [ERROR, "last"],
            quotes: OFF,
            "no-extra-semi": OFF,
            "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
            "class-methods-use-this": [
                "error",
                { exceptMethods: ["getWindowDimensions"] }
            ]
        },
        overrides: [
            // Override some TypeScript rules just for .js files
            {
                files: ["*.js"],
                rules: {
                    "@typescript-eslint/no-var-requires": "off" //
                }
            }
        ]
    }
}

module.exports = lax()
