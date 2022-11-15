import { SIGN_UP_VALIDATION_MESSAGES, TEST_USER } from '../support/constants/constants'
import { HomePage } from '../support/pages/HomePage'
import { LoginPage } from '../support/pages/LoginPage'
import { PageFactory } from '../support/pages/PageFactory'
import { INVALID_EMAILS, PAGES } from '../support/types/types'
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

    it.only(`Should active password validation helper while registration with password 'TEST123!'`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.clickSignUpButton()
        signUpPage.getSignUpForFreeButton().should('be.visible')
        signUpPage.fillEmailField(TEST_USER.email)
        signUpPage.fillPasswordField('TEST123!')
        signUpPage.getPasswordValidationHelperByName('One lowercase character').should('have.attr', 'fill', '#04AA6D')
    })
    







    // it(`Should show "${invalidPasswordValidationMessage}" validation message while logging in with valid email and empty password`, () => {
    //     homePage.navigationBar.clickLoginButton()
    //     loginPage.fillEmailField(TEST_USER.email)
    //     loginPage.submitForm()
    //     loginPage.getValidationAlert().should('have.text', invalidPasswordValidationMessage)
    // })

    // it(`Should show "${invalidPasswordValidationMessage}" validation message while logging in with valid email and invalid password`, () => {
    //     homePage.navigationBar.clickLoginButton()
    //     loginPage.fillEmailField(TEST_USER.email)
    //     loginPage.fillPasswordField(randomstring.generate(8))
    //     loginPage.submitForm()
    //     loginPage.getValidationAlert().should('have.text', invalidPasswordValidationMessage)
    // })

    // it('Should transfer the user to the reset password page', () => {
    //     homePage.navigationBar.clickLoginButton()
    //     loginPage.getForgotPasswordButton().click()
    //     resetPasswordPage.getEmailField().should('be.visible')
    // })
})