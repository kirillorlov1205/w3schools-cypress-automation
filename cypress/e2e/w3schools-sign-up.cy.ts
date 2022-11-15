import { SIGN_UP_INVALID_PASSWORDS, SIGN_UP_VALIDATION_MESSAGES, TEST_USER } from '../support/types/constants'
import { HomePage } from '../support/pages/HomePage'
import { LoginPage } from '../support/pages/LoginPage'
import { PageFactory } from '../support/pages/PageFactory'
import { INVALID_EMAILS, PAGES } from '../support/types/enums'
import randomstring from 'randomstring'
import { SignUpPage } from 'cypress/support/pages/SignUpPage'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage
const loginPage: LoginPage = PageFactory.getPage(PAGES.LOGIN) as LoginPage
const signUpPage: SignUpPage = PageFactory.getPage(PAGES.SIGN_UP_PAGE) as SignUpPage

describe('Sign up tests', () => {

    const randomEmail = `${randomstring.generate(8)}@gmail.com`.toLowerCase()

    beforeEach(() => {
        homePage.visitPage()
    })

    it(`Should successfully register the user with email "${randomEmail}", 
    password "${TEST_USER.password}", first name "${TEST_USER.firstName}", lastName "${TEST_USER.lastName}"`, () => {
        signUpPage.register(randomEmail, TEST_USER.password, TEST_USER.firstName, TEST_USER.lastName)
    })

    it(`Should show "${SIGN_UP_VALIDATION_MESSAGES.emptyEmailValidationMessage}" validation message while registration with empty email and valid password`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.clickSignUpButton()
        signUpPage.fillPasswordField(TEST_USER.password)
        signUpPage.clickSignUpForFreeButton()
        signUpPage.getEmailValidationMessage().should('have.text', SIGN_UP_VALIDATION_MESSAGES.emptyEmailValidationMessage)
    })

    for (const value in INVALID_EMAILS) {
        const invalidEmail = INVALID_EMAILS[value as keyof typeof INVALID_EMAILS]
        it(`Should show "${SIGN_UP_VALIDATION_MESSAGES.invalidEmailValidationMessage}" validation message while registration with invalid email "${invalidEmail}" and valid password`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickSignUpButton()
            signUpPage.getSignUpForFreeButton().should('be.visible')
            signUpPage.fillEmailField(invalidEmail)
            signUpPage.fillPasswordField(TEST_USER.password)
            signUpPage.clickSignUpForFreeButton()
            signUpPage.getEmailValidationMessage().should('have.text', SIGN_UP_VALIDATION_MESSAGES.invalidEmailValidationMessage)
        })
    }

    it(`Should transfer the user to the login page while clicking button Log in on the Sign up page`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.clickSignUpButton()
        signUpPage.clickReturnToLoginButton()
        loginPage.getSignUpButton().should('be.visible')
    })

    for (const value in SIGN_UP_INVALID_PASSWORDS) {
        const invalidPassword = SIGN_UP_INVALID_PASSWORDS[value as keyof typeof SIGN_UP_INVALID_PASSWORDS]
        it.only(`Should active password validation helper "${value}" while registration with invalid password "${invalidPassword}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickSignUpButton()
            signUpPage.getSignUpForFreeButton().should('be.visible')
            signUpPage.fillEmailField(TEST_USER.email)
            signUpPage.fillPasswordField(invalidPassword)
            signUpPage.getPasswordValidationHelperByName(value).should('have.attr', 'fill', '#04AA6D')
        })
    }
})