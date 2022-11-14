import { ResetPasswordPage } from 'cypress/support/pages/ResetPasswordPage'
import { TEST_USER } from '../support/constants/constants'
import { HomePage } from '../support/pages/HomePage'
import { LoginPage } from '../support/pages/LoginPage'
import { PageFactory } from '../support/pages/PageFactory'
import { INVALID_EMAILS, PAGES } from '../support/types/types'
import randomstring from 'randomstring'
import { SignUpPage } from 'cypress/support/pages/SignUpPage'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage
const loginPage: LoginPage = PageFactory.getPage(PAGES.LOGIN) as LoginPage
const resetPasswordPage: ResetPasswordPage = PageFactory.getPage(PAGES.RESET_PASSWORD_PAGE) as ResetPasswordPage
const signUpPage : SignUpPage = PageFactory.getPage(PAGES.SIGN_UP_PAGE) as SignUpPage

describe('Login tests', () => {

    beforeEach(() => {
        homePage.visitPage()
    })

    describe('Login page tests', () => {

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

        it('Should transfer the user to the sign up page while clicking on sign up button on login page', () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickSignUpButton()
            signUpPage.getSignUpSubmitButton().should('be.visible')
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
            loginPage.fillEmailField(`${randomstring.generate(8)}@gmail.com`)
            loginPage.fillPasswordField(TEST_USER.password)
            loginPage.submitForm()
            loginPage.getValidationAlert().should('have.text', emailDoesNotExistValidationMessage)
        })

        it(`Should show "${invalidPasswordValidationMessage}" validation message while logging in with valid email and empty password`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.fillEmailField(TEST_USER.email)
            loginPage.submitForm()
            loginPage.getValidationAlert().should('have.text', invalidPasswordValidationMessage)
        })

        it(`Should show "${invalidPasswordValidationMessage}" validation message while logging in with valid email and invalid password`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.fillEmailField(TEST_USER.email)
            loginPage.fillPasswordField(randomstring.generate(8))
            loginPage.submitForm()
            loginPage.getValidationAlert().should('have.text', invalidPasswordValidationMessage)
        })

        it('Should transfer the user to the reset password page', () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.getForgotPasswordButton().click()
            resetPasswordPage.getEmailField().should('be.visible')
        })
    })

    describe('Reset password page tests', () => {

        const InvalidEmailValidationMessage = 'Please enter a valid email address'
        const successfulValidationEmailMessage = "We'll email you a password reset link."
        const passwordResetSpamInfoMessage = "If the email doesn't show up soon, check your spam folder. We sent it from login@w3schools.com."
        const emailDoesNotExistAlert = 'A user with this email does not exist'

        it(`Should show "${InvalidEmailValidationMessage}" validation message and allow the user to reset password with valid email "${TEST_USER.email}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.fillEmailField(TEST_USER.email)
            resetPasswordPage.getResetPasswordSubmitButton().should('be.enabled')
            resetPasswordPage.getSuccessfulValidationEmailMessage().should('have.text', successfulValidationEmailMessage)
        })

        it(`Should send the email with password resetting instraction with valid email "${TEST_USER.email}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.fillEmailField(TEST_USER.email)
            resetPasswordPage.clickResetPasswordSubmitButton()
            resetPasswordPage.getPasswordResetSuccessfulMessage().should('have.text', `We’ve sent an email to ${TEST_USER.email} with instructions.`)
            resetPasswordPage.getPasswordResetSpamInfoMessage().should('have.text', passwordResetSpamInfoMessage)
        })

        it('Should navigate to the Login page while clicking button "Return to login" on successful password reset page', () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.fillEmailField(TEST_USER.email)
            resetPasswordPage.clickResetPasswordSubmitButton()
            resetPasswordPage.clickReturnToLoginButtonOnSuccessfulResetPage()
            loginPage.getEmailField().should('be.visible')
        })

        for (const value in INVALID_EMAILS) {
            const invalidEmail = INVALID_EMAILS[value as keyof typeof INVALID_EMAILS]
            it(`Should show "${InvalidEmailValidationMessage}" validation message while resetting password with invalid email "${invalidEmail}"`, () => {
                homePage.navigationBar.clickLoginButton()
                loginPage.clickForgotPasswordButton()
                resetPasswordPage.fillEmailField(`${invalidEmail}{enter}`)
                resetPasswordPage.getEmailValidationMessage().should('have.text', InvalidEmailValidationMessage)
                resetPasswordPage.getResetPasswordSubmitButton().should('be.disabled')
            })
        }

        it('Should navigate to the Login page while clicking button "Return to login" on reset password page', () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.clickReturnToLoginButton()
            loginPage.getEmailField().should('be.visible')
        })

        it(`Should show "${emailDoesNotExistAlert}" validation message while password resetting with email that doesn't exist in the system`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.fillEmailField(`${randomstring.generate(8)}@gmail.com`)
            resetPasswordPage.clickResetPasswordSubmitButton()
            resetPasswordPage.getEmailDoesNotExistAlert().should('have.text',emailDoesNotExistAlert)
        })
    })
})