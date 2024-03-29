import { ResetPasswordPage } from 'cypress/e2e/pages/ResetPasswordPage'
import { LOGIN_VALIDATION_MESSAGES, PASSWORD_RESET_VALIDATION_MESSAGES, TEST_USER } from 'cypress/support/constants'
import { HomePage } from 'cypress/e2e/pages/HomePage'
import { LoginPage } from 'cypress/e2e/pages/LoginPage'
import { PageFactory } from 'cypress/e2e/pages/PageFactory'
import { INVALID_EMAILS } from 'cypress/support/constants'
import randomstring from 'randomstring'
import { SignUpPage } from 'cypress/e2e/pages/SignUpPage'
import { PAGES } from 'cypress/support/enums'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage
const loginPage: LoginPage = PageFactory.getPage(PAGES.LOGIN) as LoginPage
const resetPasswordPage: ResetPasswordPage = PageFactory.getPage(PAGES.RESET_PASSWORD_PAGE) as ResetPasswordPage
const signUpPage: SignUpPage = PageFactory.getPage(PAGES.SIGN_UP_PAGE) as SignUpPage

describe('Login tests', () => {

    beforeEach(() => {
        cy.clearLocalStorage()
        cy.clearCookies();
        homePage.visitPage()
    })

    describe('Login page tests', () => {

        it('Should successfully log the user in with correct credentials', () => {
            homePage.navigationBar.clickLoginButton()
            cy.login(TEST_USER.email, TEST_USER.password)
            homePage.navigationBar.getLogOutButton().should('be.visible')
            homePage.navigationBar.clickLogOutButton()
        })

        it('Should transfer the user to the Sign up page while clicking on [sign up] button on Login page', () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickSignUpButton()
            signUpPage.getSignUpForFreeButton().should('be.visible')
        })

        it(`Should show "${LOGIN_VALIDATION_MESSAGES.emptyEmailValidationMessage}" validation message while logging in with empty email and valid password`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.fillPasswordField(TEST_USER.password)
            loginPage.submitForm()
            loginPage.getEmailValidationMessage().should('have.text', LOGIN_VALIDATION_MESSAGES.emptyEmailValidationMessage)
        })

        for (const key in INVALID_EMAILS) {
            const invalidEmail = INVALID_EMAILS[key as keyof typeof INVALID_EMAILS]
            it(`Should show "${LOGIN_VALIDATION_MESSAGES.invalidEmailValidationMessage}" validation message while logging in with invalid email "${invalidEmail}" and valid password`, () => {
                homePage.navigationBar.clickLoginButton()
                loginPage.fillEmailField(invalidEmail)
                loginPage.fillPasswordField(TEST_USER.password)
                loginPage.submitForm()
                loginPage.getEmailValidationMessage().should('have.text', LOGIN_VALIDATION_MESSAGES.invalidEmailValidationMessage)
            })
        }

        it(`Should show "${LOGIN_VALIDATION_MESSAGES.emailDoesNotExistValidationMessage}" validation message while logging in with a valid email that doesn't exist in the system and valid password`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.fillEmailField(`${randomstring.generate(8)}@gmail.com`)
            loginPage.fillPasswordField(TEST_USER.password)
            loginPage.submitForm()
            loginPage.getValidationAlert().should('have.text', LOGIN_VALIDATION_MESSAGES.emailDoesNotExistValidationMessage)
        })

        it(`Should show "${LOGIN_VALIDATION_MESSAGES.invalidPasswordValidationMessage}" validation message while logging in with valid email and empty password`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.fillEmailField(TEST_USER.email)
            loginPage.submitForm()
            loginPage.getValidationAlert().should('have.text', LOGIN_VALIDATION_MESSAGES.invalidPasswordValidationMessage)
        })

        it(`Should show "${LOGIN_VALIDATION_MESSAGES.invalidPasswordValidationMessage}" validation message while logging in with valid email and invalid password`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.fillEmailField(TEST_USER.email)
            loginPage.fillPasswordField(randomstring.generate(8))
            loginPage.submitForm()
            loginPage.getValidationAlert().should('have.text', LOGIN_VALIDATION_MESSAGES.invalidPasswordValidationMessage)
        })

        it('Should transfer the user to the Reset password page', () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.getEmailField().should('be.visible')
        })

        it(`Should transfer the user to the Home page while clicking on [Home page] navigation button on the Login page`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickHomePageButton()
            homePage.getWhereToBeginButton().should('be.visible')
        })
    })

    describe('Reset password page tests', () => {

        it(`Should show "${PASSWORD_RESET_VALIDATION_MESSAGES.successfulValidationEmailMessage}" validation message and allow the user to reset password with valid email "${TEST_USER.email}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.fillEmailField(TEST_USER.email)
            resetPasswordPage.getResetPasswordSubmitButton().should('be.enabled')
            resetPasswordPage.getSuccessfulValidationEmailMessage().should('have.text', PASSWORD_RESET_VALIDATION_MESSAGES.successfulValidationEmailMessage)
        })

        it(`Should send the email with password resetting instruction with valid email "${TEST_USER.email}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.fillEmailField(TEST_USER.email)
            resetPasswordPage.clickResetPasswordSubmitButton()
            resetPasswordPage.getPasswordResetSuccessfulMessage().should('have.text', `We’ve sent an email to ${TEST_USER.email} with instructions.`)
            resetPasswordPage.getPasswordResetSpamInfoMessage().should('have.text', PASSWORD_RESET_VALIDATION_MESSAGES.passwordResetSpamInfoMessage)
        })

        it('Should navigate to the Login page while clicking button [Return to login] on successful password reset page', () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.fillEmailField(TEST_USER.email)
            resetPasswordPage.clickResetPasswordSubmitButton()
            resetPasswordPage.clickReturnToLoginButtonOnSuccessfulResetPage()
            loginPage.getEmailField().should('be.visible')
        })

        for (const key in INVALID_EMAILS) {
            const invalidEmail = INVALID_EMAILS[key as keyof typeof INVALID_EMAILS]
            it(`Should show "${PASSWORD_RESET_VALIDATION_MESSAGES.InvalidEmailValidationMessage}" validation message while resetting password with invalid email "${invalidEmail}"`, () => {
                homePage.navigationBar.clickLoginButton()
                loginPage.clickForgotPasswordButton()
                resetPasswordPage.fillEmailField(`${invalidEmail}{enter}`)
                resetPasswordPage.getEmailValidationMessage().should('have.text', PASSWORD_RESET_VALIDATION_MESSAGES.InvalidEmailValidationMessage)
                resetPasswordPage.getResetPasswordSubmitButton().should('be.disabled')
            })
        }

        it('Should navigate to the Login page while clicking button [Return to login] on Reset password page', () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.clickReturnToLoginButton()
            loginPage.getEmailField().should('be.visible')
        })

        it(`Should show "${PASSWORD_RESET_VALIDATION_MESSAGES.emailDoesNotExistAlert}" validation message while password resetting with email that doesn't exist in the system`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.fillEmailField(`${randomstring.generate(8)}@gmail.com`)
            resetPasswordPage.clickResetPasswordSubmitButton()
            resetPasswordPage.getEmailDoesNotExistAlert().should('have.text', PASSWORD_RESET_VALIDATION_MESSAGES.emailDoesNotExistAlert)
        })

        it(`Should transfer the user to the Home page while clicking on [Home page] navigation button on the Password reset page`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickForgotPasswordButton()
            resetPasswordPage.clickHomePageButton()
            homePage.getWhereToBeginButton().should('be.visible')
        })
    })
})