module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended"
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
            4
        ],
        "no-use-before-define" : 1,
        "no-console":0,
        "linebreak-style":"windows",
        "camelcase":["error",{ "properties": "always" }],
    },
    "settings":{
        "react":{
            "version":"detect"
        }
    }
};
