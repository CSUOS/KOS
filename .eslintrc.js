export default {
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
        "no-unused-vars":1,
        "no-use-before-define" : 1,
        "no-redeclare":1,
        "no-console":0,
    },
    "settings":{
        "react":{
            "version":"detect"
        }
    }
};
