module.exports = {
    "parser": "babel-eslint",
    "env": {
        "commonjs": true,
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "indent":[
            "error",
            "tab"
        ],
        "linebreak-style": ["error", "windows"],
        "no-unused-vars":"warn",
        "no-use-before-define" : 1,
        "no-console":0,
        "camelcase":["error",{ "properties": "always" }],
        "no-tabs":0,
    },
    "settings":{
        "react":{
            "version":"detect"
        }
    }
};
