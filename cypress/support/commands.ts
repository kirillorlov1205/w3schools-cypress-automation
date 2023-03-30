/// <reference types='cypress' />

import { LoginPage } from 'cypress/e2e/pages/LoginPage'
import { PageFactory } from 'cypress/e2e/pages/PageFactory'
import { PAGES } from './enums'
import 'cypress-iframe'

const loginPage = PageFactory.getPage(PAGES.LOGIN) as LoginPage

Cypress.Commands.add('login', (email: string, password: string) => {
    loginPage.fillEmailField(email)
    loginPage.fillPasswordField(password)
    loginPage.submitForm()
})