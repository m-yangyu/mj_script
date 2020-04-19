module.exports = {
    moduleFileExtensions: [
        "js",
        "json",
        "jsx",
        "ts",
        "tsx",
        "node"
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "src"
    ],
    transformIgnorePatterns: [
        '/dist/',
        'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
    ],
    "moduleNameMapper": {
        "^@/(.)*$": "<rootDir>/src/$1"
    }
}