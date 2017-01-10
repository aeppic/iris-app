module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
        "semi": [1,"never"],
        "no-trailing-spaces": [0],
        "no-use-before-define": [1, 'nofunc'],
        "no-underscore-dangle": [0],
        "import/no-extraneous-dependencies": [0],
        "import/prefer-default-export": [1],
        "no-restricted-syntax": [0],
        "no-comma-dangle": [1],
        "comma-dangle": [0]
    },
    "globals": {
        "document": true,
        "window": true,
        "IRIS_BA_VERSION": true
    }
};
