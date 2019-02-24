module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        'airbnb-base',
        'plugin:vue/essential'
    ],
    plugins: ['vue'],
    rules: {
        'no-use-before-define': 0,
        'import/extensions': 0,
        'import/first': 0,
        'no-unused-vars': 0,
        "linebreak-style": 0,
        "no-shadow": 0,
        "arrow-parens": 0,
        "max-len": 0,
        "no-return-assign": 0,
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state', // for vuex state
                'acc', // for reduce accumulators
                'e' // for e.returnvalue
            ]
        }],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
