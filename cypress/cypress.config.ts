import { defineConfig } from 'cypress'
import AllureWriter from '@shelex/cypress-allure-plugin/writer'
import { ASSETS_FOLDER, BASE_URL, DEFAULT_WAITING_TIME } from './support/types/constants'
import { logger } from './support/logger'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/**/*.cy.ts',
    baseUrl: BASE_URL,
    defaultCommandTimeout: DEFAULT_WAITING_TIME,
    supportFile: 'cypress/support/index.ts',
    videosFolder: `${ASSETS_FOLDER}/videos`,
    downloadsFolder: `${ASSETS_FOLDER}/downloads`,
    screenshotsFolder: `${ASSETS_FOLDER}/screenshots`,
    fixturesFolder: 'cypress/fixtures',
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          logger.info(message)
          return null
        },
      })
      AllureWriter(on, config)
      return config
    },
    env: {
      allure: 'true',
      allureResultsPath: 'cypress/assets/allure-results'
    },
  }
})