const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      require('@cypress/code-coverage/task')(on, config)
      on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
      
      return config;
    },
    baseUrl: "https://log-automobile.netlify.app/en",
  },
});
