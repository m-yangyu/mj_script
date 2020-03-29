module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "ENV": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "warn",
        "react/jsx-props-no-spreading": "warn"
    },
    "settings": {
        'import/resolver': {
            alias: {
              map: [
                ['@', './src/'],
                ['~', './config/'],
              ],
            }
        }
    }
};