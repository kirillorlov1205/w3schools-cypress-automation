import { ResetPasswordPage } from 'cypress/support/pages/ResetPasswordPage'
import { TEST_USER } from '../support/constants/constants'
import { HomePage } from '../support/pages/HomePage'
import { LoginPage } from '../support/pages/LoginPage'
import { PageFactory } from '../support/pages/PageFactory'
import { INVALID_EMAILS, PAGES } from '../support/types/types'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage
const loginPage: LoginPage = PageFactory.getPage(PAGES.LOGIN) as LoginPage
const resetPasswordPage: ResetPasswordPage

describe('Login page tests', () => {

    beforeEach(() => {
        homePage.visitPage()
    })

    const invalidEmailValidationMessage = 'Looks like you forgot something'
    const emptyEmailValidationMessage = 'Please enter an email'
    const emailDoesNotExistValidationMessage = 'A user with this email does not exist'
    const invalidPasswordValidationMessage = 'Make sure you type your email and password correctly. Both your password and email are case-sensitive.'

    it('Should successfully log the user in with correct credentials', () => {
        homePage.navigationBar.clickLoginButton()
        cy.login(TEST_USER.email, TEST_USER.password)
        homePage.navigationBar.getLogOutButton().should('be.visible')
        homePage.navigationBar.clickLogOutButton()
    })

    it(`Should show "${emptyEmailValidationMessage}" validation message while logging in with empty email and valid password`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.fillPasswordField(TEST_USER.password)
        loginPage.submitForm()
        loginPage.getEmailValidationMessage().should('have.text', emptyEmailValidationMessage)
    })

    for (const value in INVALID_EMAILS) {
        const invalidEmail = INVALID_EMAILS[value as keyof typeof INVALID_EMAILS]
        it(`Should show "${invalidEmailValidationMessage}" validation message while logging in with invalid email "${invalidEmail}" and valid password`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.fillEmailField(invalidEmail)
            loginPage.fillPasswordField(TEST_USER.password)
            loginPage.submitForm()
            loginPage.getEmailValidationMessage().should('have.text', invalidEmailValidationMessage)
        })
    }

    it(`Should show "${emailDoesNotExistValidationMessage}" validation message while logging in with a valid email that doesn't exist in the system and valid password`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.fillEmailField('abc-@mail.com')
        loginPage.fillPasswordField(TEST_USER.password)
        loginPage.submitForm()
        loginPage.getValidationAlert().should('have.text', emailDoesNotExistValidationMessage)
    })

    it(`Should show "Incorrect password alert" while logging in with valid email and empty password`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.fillEmailField(TEST_USER.email)
        loginPage.submitForm()
        loginPage.getValidationAlert().should('have.text', invalidPasswordValidationMessage)
    })

    it(`Should show "Incorrect password alert" while logging in with valid email and invalid password`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.fillEmailField(TEST_USER.email)
        loginPage.fillPasswordField('invalidPassord')
        loginPage.submitForm()
        loginPage.getValidationAlert().should('have.text', invalidPasswordValidationMessage)
    })

    it.only('Should transfer user to the ', () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.getForgotPasswordButton().click()

    })

})