import { TEST_USER } from '../support/constants/constants'
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

    beforeEach(() => {
        homePage.visitPage()
    })

    const invalidEmailValidationMessage = 'Looks like you forgot something'
    const validCredsValidationMessage = "Your password is secure and you're all set!"

    it.only('Should successfully register the user with valid credentials', () => {
        const randomEmail = `${randomstring.generate(8)}@gmail.com`.toLowerCase()
        homePage.navigationBar.clickLoginButton()
        loginPage.clickSignUpButton()
        signUpPage.fillEmailField(randomEmail)
        signUpPage.fillPasswordField(TEST_USER.password)
        signUpPage.getValidationAlert().should('have.text', validCredsValidationMessage)
        signUpPage.clickSignUpForFreeButton()
        signUpPage.fillNameFieldByType('first', TEST_USER.firstName)
        signUpPage.fillNameFieldByType('last', TEST_USER.lastName)
        signUpPage.clickSignUpForFreeButton()
        signUpPage.getValidationAlert().should('have.text', `We've sent an email to ${randomEmail} with instructions.`)
    })

    // it(`Should show "${emptyEmailValidationMessage}" validation message while logging in with empty email and valid password`, () => {
    //     homePage.navigationBar.clickLoginButton()
    //     loginPage.fillPasswordField(TEST_USER.password)
    //     loginPage.submitForm()
    //     loginPage.getEmailValidationMessage().should('have.text', emptyEmailValidationMessage)
    // })

    // for (const value in INVALID_EMAILS) {
    //     const invalidEmail = INVALID_EMAILS[value as keyof typeof INVALID_EMAILS]
    //     it(`Should show "${invalidEmailValidationMessage}" validation message while logging in with invalid email "${invalidEmail}" and valid password`, () => {
    //         homePage.navigationBar.clickLoginButton()
    //         loginPage.fillEmailField(invalidEmail)
    //         loginPage.fillPasswordField(TEST_USER.password)
    //         loginPage.submitForm()
    //         loginPage.getEmailValidationMessage().should('have.text', invalidEmailValidationMessage)
    //     })
    // }

    // it(`Should show "${emailDoesNotExistValidationMessage}" validation message while logging in with a valid email that doesn't exist in the system and valid password`, () => {
    //     homePage.navigationBar.clickLoginButton()
    //     loginPage.fillEmailField(`${randomstring.generate(8)}@gmail.com`)
    //     loginPage.fillPasswordField(TEST_USER.password)
    //     loginPage.submitForm()
    //     loginPage.getValidationAlert().should('have.text', emailDoesNotExistValidationMessage)
    // })

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