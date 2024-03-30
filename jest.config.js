module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
    ],
};


module.exports = {
    testMatch: ["<rootDir>/lib/test/**/*.test.[jt]s?(x)"],
    // other Jest configuration options...
};