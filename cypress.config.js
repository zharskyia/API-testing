// const { defineConfig } = require("cypress");
const { defineConfig } = require("mocha");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
